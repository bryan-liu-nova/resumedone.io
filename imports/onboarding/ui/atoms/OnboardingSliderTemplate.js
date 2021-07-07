import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { rgba } from 'polished'
import PropTypes from 'prop-types';

import { Heading } from '/imports/core/ui/atoms';
import { OnboardingButton } from '/imports/onboarding/ui/atoms';

class SliderTemplate extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    selected: PropTypes.bool,
    recommended: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    experiment: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.selected !== this.props.selected ||
      nextProps.width !== this.props.width ||
      nextProps.height !== this.props.height
    );
  }

  static defaultProps = {
    selected: false,
    recommend: false,
  };

  select = () => {
    const { selected, onSelect, id, image } = this.props;
    if (selected) {
      onSelect(id, image);
    }
  };

  render() {
    const { name, id, image, width, height, featured, message, selected, experiment } = this.props;
    return (
      <Template width={width} selected={selected} onClick={this.select} experiment={experiment}>
        {experiment < '4' && <TemplateName selected={selected} experiment={experiment}>{name}</TemplateName>}
        <TemplateImage selected={selected} url={`/img/templates/${image || id}.jpg`} width={width} height={height} experiment={experiment}>
          {featured && <Recommended>{message || 'Recommended'}</Recommended>}
        </TemplateImage>
        {experiment == '5' && <Description>Click to select<br />this template</Description>}
        <ButtonWrap selected={selected}>
          <OnboardingButton fullWidth template experiment={experiment}>Select</OnboardingButton>
        </ButtonWrap>
        {experiment >= '4' && <TemplateName selected={selected} experiment={experiment}>{name}</TemplateName>}
      </Template>
    );

  }
}

const Description = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 1;
  opacity: 0;
  width: 100%;
  color: #fff;
  font-family: Poppins, sans-serif !important;
  font-size: 22px;
  line-height: 36px;
  font-weight: 700;
  letter-spacing: .25em;
  text-align: center;
  text-transform: uppercase;
  transform: translateY(-50%);
`;

const Template = styled.div`
  margin: 16px;
  width: ${({ width }) => width}px;
  position: relative;
  // transition: transform 0.2s ease;
  transform: scale(1);
  cursor: pointer;
  outline: none;
  touch-action: none;
  display: inline-block;
  ${({ selected }) => selected && css`
    transform: scale(1.05);
  `}

  ${({ selected, experiment }) => selected && experiment == '5' && css`
    &:hover::after {
      background-color: rgba(243,113,1,.65);
    }
    &:hover ${Description} {
      opacity: 1 !important;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(243,113,1,0);
      transition: background-color .2s;
    }
  `}
`;

const TemplateName = styled(p => <Heading level={5} {...p} />)`
  ${({ theme, experiment, selected }) => {
    if (experiment == '0') {
      return css`
        font-size: ${theme.font.size.h5};
        color: ${selected ? theme.colors.primary : theme.colors.gray.dark} !important;
        font-weight: 400;
      `;
    }
    if (experiment == '1') {
      return css`
        font-size: ${theme.font.size.smaller};
        color: ${selected ? 'black' : 'rgba(152, 161, 179, 0.7)'} !important;
        font-weight: 700;
      `;
    }
    if (experiment == '2') {
      return css`
        font-size: ${theme.font.size.h5};
        color: ${selected ? theme.colors.primary : theme.colors.black} !important;
        font-weight: 400;
      `;
    }
    if (experiment == '3') {
      return css`
        font-size: ${theme.font.size.h5};
        color: ${selected ? '#f37101' : theme.colors.black} !important;
        font-weight: 400;
      `;
    }
    if (experiment >= '4') {
      return css`
        font-size: ${theme.font.size.smaller};
        color: ${selected ? 'black' : 'rgba(152, 161, 179, 0.7)'} !important;
        font-weight: 700;
        position: absolute;
        bottom: -50px;
        left: 50%;
        transform: translateX(-50%);    
      `;
    }
  }}
  ${({ theme, experiment }) => experiment > '0' && css`
    font-family: Poppins, sans-serif !important;
  `}
  text-align: center;
  margin-bottom: 8px;
  margin-top: 0;
`;

const TemplateImage = styled.div`
  background-image: url(${({ url }) => url});
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: #ffffff;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border: 1px solid #e5e9f2;
  position: relative;
  ${({ selected }) => selected && css`
    box-shadow:0 1px 3px ${({ theme }) => rgba(theme.colors.primary, 0.6)};
    border-color: ${({ theme, experiment }) => experiment >= '3' ? '#f37101' : theme.colors.primary };
    border-style: solid;
    border-width: ${({ theme, experiment }) => experiment >= '4' ? '1px' : '2px' };
  `}
`;

const ButtonWrap = styled.div`
  display: ${({ selected }) => selected && 'block' || 'none'};
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
`;

const Recommended = styled.div`
    position: absolute;
    top: 27px;
    right: -35px;
    width: 152px;
    height: 30px;
    background-image: url(/img/onboarding/recommended-banner.svg);
    background-size: contain;
    background-repeat: no-repeat;
    font-size: 11px;
    font-weight: 700;
    padding-bottom: 2px;
    line-height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row nowrap;
    text-transform: uppercase;
    text-align: center;
    color: #fff;
    transform: rotate(45deg);
`;

export default SliderTemplate;
