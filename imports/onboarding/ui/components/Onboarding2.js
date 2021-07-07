import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import { createGlobalStyle } from 'styled-components';
import { Analytics } from '/imports/core/api/analytics';
import { TEMPLATES, FAKE_TEMPLATES } from '/imports/generator/api/constants';
import shuffle from 'lodash/shuffle';

import $ from 'jquery';
import '../../../../public/js/slick.js';
import '../../../../public/css/all.min.css';

const removeTemplates = ['moscow', 'singapore', 'vancouver'];
const templates = shuffle(TEMPLATES.filter(t => !removeTemplates.some(id => id === t.id)).concat(FAKE_TEMPLATES));

class Onboarding extends PureComponent {
  componentDidMount() {
    Analytics.track('template_view', {
      variant: '2',
      random_default_template: templates[0].name
    });
    $(document).ready(
      function(){
        $(".c-slick-examples").length &&
        $(".c-slick-examples").slick({
          centerMode: true,
          speed: 300,
          variableWidth: true,
          slidesToShow: 4,
          focusOnSelect: true,
        })
      });
    setTimeout(() => {
      $(".c-slick-examples").length &&
      $(".c-slick-examples").slick('refresh');
    }, 1000);
    try {
      document.getElementsByTagName('body')[0].classList.add('_container');
    } catch(error) {
      console.error("Can't find body tag");
    }
  }

  componentWillUnmount() {
    try {
      document.getElementsByTagName('body')[0].classList.remove('_container');
    } catch(error) {
      console.error("Can't find body tag");
    }
  }

  selectCurrent = () => {
    const { onSelect } = this.props;
    let id = templates[0].id;
    let image = null;
    const el = document.getElementsByClassName('slick-current')[0];
    if(el) {
      id = el.getAttribute('data-id');
      image = el.getAttribute('data-img');
    }
    onSelect(id, image);
  };

  render() {
    return (
      <div>
        <header className="b-header b-header_style_2">
          <div className="b-header__item">
            <div className="b-header__logo"></div>
          </div>
        </header>
        <div className="b-state">
          <div className="b-state__header">
            <div className="b-state__header-item">
              <div className="b-state__heading">Step 1 of 4</div>
            </div>
            <div className="b-state__header-item">
              <div className="b-state__nav">
                <div className="b-state__nav-inner">
                  <div className="b-state__nav-item">
                    <button className="b-state__nav-btn" disabled></button>
                  </div>
                  <div className="b-state__nav-item">
                    <button className="b-state__nav-btn" onClick={this.selectCurrent}></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="b-state__slider">
            <div className="b-state__slider-bar" style={{ width: '25%' }}></div>
          </div>
        </div>
        <div className="b-section-steps b-section-steps_style_2">
          <div className="b-section-steps__inner">
            <div className="b-section-steps__heading">
              <div className="b-heading b-heading_m_b_xxl">
                <h1 className="b-heading__title">Choose Your CV Template</h1>
                <p className="b-heading__subtitle">Select a template below. You can change this later.</p>
              </div>
            </div>
            <div className="b-section-steps__list b-list-examples b-list-examples_style_2">
              <div className="b-list-examples__inner c-slick-examples">
                {templates.map((t, i) => (
                  <Template {...t} key={t.image || t.id} onSelect={this.props.onSelect} />
                ))}
              </div>
              <AddStyle />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Template extends PureComponent {
  render() {
    const { id, name, image } = this.props;
    return (
      <div className="b-list-examples__item" data-id={id} data-img={image}>
        <a className="b-list-examples__item-inner" href="#!" onClick={() => this.props.onSelect(id, image)}>
          <div className="b-list-examples__img">
            <img className="b-list-examples__img-plug" src={`${Meteor.absoluteUrl()}media/img/b-list-examples/default.jpg`} alt="Template is Loading" />
            <div className="b-list-examples__img-inner" style={{ backgroundImage: `url( ${Meteor.absoluteUrl()}img/templates/${image || id}.jpg )` }} />
          </div>
          <button className="b-list-examples__btn -ol-btn" onClick={e => {e.stopPropagation(); this.props.onSelect(id, image);}}>Start with this template</button>
          <div className="b-list-examples__title" onClick={e => {e.stopPropagation(); this.props.onSelect(id, image);}}>{name}</div>
        </a>
      </div>
    );
  }
}

const AddStyle = createGlobalStyle`
  .slick-next {
    color: transparent !important;
  }
  .slick-next:hover {
    background-color: #000 !important;
  }
  .slick-next:focus {
    background-color: #000 !important;
  }
  .slick-next:before {
    content: '' !important;
  }
  .slick-prev {
    color: transparent !important;
  }
  .slick-prev:hover {
    background-color: #000 !important;
  }
  .slick-prev:focus {
    background-color: #000 !important;
  }
  .slick-prev:before {
    content: '' !important;
  }
`;

export default Onboarding;
