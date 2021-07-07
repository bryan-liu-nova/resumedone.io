import React, { Component } from 'react';
import { Analytics } from '/imports/core/api/analytics';
import emitter from 'react-ab-test/lib/emitter'
import styled, { css } from 'styled-components';
import '../style/exp.css';

export default class LandingExp extends Component {
  componentDidMount() {
    const value = emitter.getActiveVariant('landing_view_experiment');
    Analytics.track('landing_view', {
      variant: value == '0' ? 'original' : value
    });
  }

  onClickLandingCTA = () => {
    const value = emitter.getActiveVariant('landing_view_experiment');
    this.props.ctaClick(value, 'Create my CV');
  };

  render() {
    return (
      <div className={`b-hero b-hero_style_${this.props.variant + 2}`}>
        <div className="b-hero__item b-hero__item_content">
          <header className="b-header">
            <div className="b-header__item">
              <div className="b-header__logo"></div>
            </div>
          </header>
          <section className="b-hero__content">
            <div className="b-hero__heading">
              <h1 className="b-hero__heading-text"><span className="b-hero__heading-text_highlighted">Easy</span> Online<br /><span className="b-hero__heading-text_lg">CV Builder</span></h1>
              <p className="b-hero__subheading-text">Get all the help you need to create a professional CV in minutes</p>
            </div>
            {this.props.variant == 14 ? (
              <span className="b-hero__btn" onClick={this.onClickLandingCTA}><span className="b-hero__btn-inner"><span className="b-hero__btn-inner-2"><span className="b-hero__btn-text">Create my CV</span></span></span></span>
            ) : (
              <>
                <p className="b-hero__subheading">3 Simple Steps</p><a className="b-hero__btn" onClick={this.onClickLandingCTA}><span className="b-hero__btn-inner"><span className="b-hero__btn-inner-2"><span className="b-hero__btn-text">Create my CV</span></span></span></a>
                <ul className="b-hero__list">
                  <li className="b-hero__list-item">
                    <p className="b-hero__list-text">Choose your <span className="b-hero__list-text_highlighted">favorite template</span></p>
                  </li>
                  <li className="b-hero__list-item">
                    <p className="b-hero__list-text">Use our <span className="b-hero__list-text_highlighted">pre-written examples</span></p>
                  </li>
                  <li className="b-hero__list-item b-hero__list-item_last">
                    <p className="b-hero__list-text">Get step-by-step <span className="b-hero__list-text_highlighted">guidance</span></p>
                  </li>
                </ul>
              </>
            )}
          </section>
          <Footer>
            <span><a href="/terms-and-conditions" target="_blank">Terms and Conditions</a>&nbsp;&nbsp;<a href="/privacy-policy" target="_blank">Privacy Policy</a></span>
          </Footer>
        </div>
        <a className="b-hero__item b-hero__item_img" onClick={this.onClickLandingCTA}>
          <div className="b-hero__demo">
            <div className="b-hero__demo-item">
              <div className="b-hero__demo-img b-hero__demo-img_1">
                <div className="b-hero__demo-img-inner"></div>
              </div>
              <div className="b-hero__demo-img b-hero__demo-img_2">
                <div className="b-hero__demo-img-inner"></div>
              </div>
            </div>
          </div>
        </a>
      </div>
    )
  }
};

const Footer = styled.div`
  position: absolute;
  left: 40px;
  bottom: 30px;

  span {
    a {
      font-size: 12px;
      text-decoration: underline;
      color: #98a1b3; 
    }
  }
`