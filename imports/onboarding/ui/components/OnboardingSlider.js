import React, { PureComponent } from 'react';
import Slider from 'react-slick';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import shuffle from 'lodash/shuffle';
import emitter from 'react-ab-test/lib/emitter'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Button, Icon } from '/imports/core/ui/atoms';
import { OnboardingSliderTemplate as Template } from '/imports/onboarding/ui/atoms';
import { BREAKPOINTS } from '/imports/core/ui/helpers';
import { darken } from 'polished';
import { TEMPLATES, FAKE_TEMPLATES, FEATURED_TEMPLATES } from '/imports/generator/api/constants';
import OnboardingNavigator from './OnboardingNavigator';

import { Analytics } from '/imports/core/api/analytics';

const removeTemplates = ['moscow', 'singapore', 'vancouver'];
const templates = TEMPLATES.filter(t => !removeTemplates.some(id => id === t.id));
templates.splice(templates.length - 1, 0, ...FAKE_TEMPLATES);

class OnboardingSlider extends PureComponent {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    experiment: PropTypes.string.isRequired
  };

  state = {
    width: 0,
    height: 0,
    current: 0,
  };

  updateDimensions = () => {
    if (!this._wrapper) {
      return;
    }
    const top = this._wrapper.offsetTop;
    const wHeight = window.innerHeight;
    const footer = window.innerWidth > BREAKPOINTS.md && 102 || 240;
    const height = Math.max(300, wHeight - top - 120 - (this.props.experiment >= '4' ? 0 : footer));
    const width = height / 280 * 190;
    this.setState({ width, height });
  };

  componentDidMount() {
    Analytics.track('template_view', {
      random_default_template: templates[0].name,
      variant: '7'
    });
    window.addEventListener('resize', this.updateDimensions);
    try {
      document.getElementsByTagName('body')[0].classList.remove('_container');
    } catch(error) {
      console.error("Can't find body tag");
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
    try {
      document.getElementsByTagName('body')[0].classList.remove('_container');
    } catch(error) {
      console.error("Can't find body tag");
    }
  }

  getWrapperRef = (node) => {
    this._wrapper = node;
    this.updateDimensions();
  };

  getSlider = (node) => {
    this._slider = node;
  };

  next = () => {
    this._slider.slickNext();
  };

  previous = () => {
    this._slider.slickPrev();
  };

  select = () => {
    const { id, image } = templates[this.state.current];
    if (this.state.current != null) {
      this.props.onSelect(id, image)
    }
  }

  render() {
    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      centerMode: true,
      variableWidth: true,
      focusOnSelect: true,
      beforeChange: (current, next) => this.setState({ current: next }),
    };
    return (
      <SliderWrapper ref={this.getWrapperRef}>
        <SliderControlLeft experiment={this.props.experiment}>
          <SliderControlButton onClick={this.previous} experiment={this.props.experiment}>
            <Icon icon="chevron-left" />
          </SliderControlButton>
        </SliderControlLeft>
        <SliderControlRight experiment={this.props.experiment}>
          <SliderControlButton onClick={this.next} experiment={this.props.experiment}>
            <Icon icon="chevron-right" />
          </SliderControlButton>
        </SliderControlRight>
        <Slider ref={this.getSlider} {...settings}>
          {templates.map((t, i) => (
            <Template
                selected={i === this.state.current}
                key={`${t.image || t.id}`}
                {...t}
                {...this.state}
                featured={Object.keys(FEATURED_TEMPLATES).includes(t.id)}
                message={FEATURED_TEMPLATES[t.id]}
                onSelect={this.props.onSelect}
                experiment={this.props.experiment}
            />
          ))}
        </Slider>
        {this.props.experiment >= '4' && <OnboardingNavigator onSelect={this.select}/>}
      </SliderWrapper>
    );
  }
}

const SliderWrapper = styled.section`
  text-align: center;
  position: relative;
  ${({ theme }) => theme.max('md')`
    margin: 0 -20px;
  `}
  ${({ theme }) => theme.min('md')`
    .slick-list {
      overflow: initial;
    }
  `}
`;

const SliderControl = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 160px;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.max('md')`
    display: none;
  `}
`;

const SliderControlLeft = styled(SliderControl)`
  left: -20px;
  ${({ experiment }) => (experiment == '0' || experiment == '3') && css`
    background: linear-gradient(to left, rgba(255,255,255,0.001), #f9fafc 55%);
  `}
  justify-content: flex-start;
`;

const SliderControlRight = styled(SliderControl)`
  right: -20px;
  ${({ experiment }) => (experiment == '0' || experiment == '3') && css`
    background: linear-gradient(to right, rgba(255,255,255,0.001), #f9fafc 55%);
  `}
  justify-content: flex-end;
`;

const SliderControlButton = styled(p => <Button unstyled {...p}/>)`
  width: 52px;
  height: 52px;
  border-radius: ${({ experiment }) => experiment >= '4' ? '0px' : '52px'};
  margin: ${({ experiment }) => experiment >= '4' ? '0px' : '36px'};
  cursor: pointer;
  color: white;
  background: ${({ theme, experiment }) => experiment >= '4' ? 'black' : theme.colors.primary};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 32px;
  &:hover {
    background: ${({ theme }) => darken(0.05, theme.colors.primary)};
    border-color: ${({ theme }) => darken(0.05, theme.colors.primary)};
  }
`;

export default OnboardingSlider;
