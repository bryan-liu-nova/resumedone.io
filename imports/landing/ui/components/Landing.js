import React, { PureComponent } from 'react';
import { Analytics } from '/imports/core/api/analytics';
import emitter from 'react-ab-test/lib/emitter'
import styled, { css } from 'styled-components';

import '../../../../public/css/all.min.css';

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

class Landing extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const value = emitter.getActiveVariant('landing_view_experiment');
    Analytics.track('landing_view', {
      variant: value == '0' ? 'original' : value
    });
    try {
      document.getElementsByTagName('body')[0].classList.add('_container');
    } catch (error) {
      console.error("Can't find body tag");
    }
  }

  componentWillUnmpount() {
    try {
      document.getElementsByTagName('body')[0].classList.remove('_container');
    } catch (error) {
      console.error("Can't find body tag");
    }
  }

  onClickLandingCTA = () => {
    const value = emitter.getActiveVariant('landing_view_experiment');
    this.props.ctaClick(value, 'Create my CV');
  };

  componentWillMount = () => {

  }

  render() {
    return (
      <Hero>
        <ItemContent variant={this.props.variant}>
          <Header>
            <HeaderItem>
              <HeaderLogo />
            </HeaderItem>
          </Header>
          <Section variant={this.props.variant}>
            <SectionHeading variant={this.props.variant}>
              {(this.props.variant == 4 || this.props.variant == 5 || this.props.variant == 8 || this.props.variant == 9 || this.props.variant == 10 || this.props.variant == 12) ? (
                <SectionTitle variant={this.props.variant}>
                  <HighLight>Easy</HighLight> Online<br /><Large>CV Builder</Large>
                </SectionTitle>
              ) : (
                <SectionTitle variant={this.props.variant}>
                  <HighLight>Easy</HighLight> Online CV Builder
                </SectionTitle>
              )}
              <SectionDescription variant={this.props.variant}>
                Get all the help you need to create a professional CV in minutes
              </SectionDescription>
            </SectionHeading>
            {(this.props.variant == 12) && (
              <SectionSubHeading>3 Easy Steps</SectionSubHeading>
            )}
            {(this.props.variant == 7 || this.props.variant == 8 || this.props.variant == 9 || this.props.variant == 10 || this.props.variant == 11 || this.props.variant == 12) ? (
            <>
              <CTA variant={this.props.variant} onClick={this.onClickLandingCTA}>
                <Inner1 variant={this.props.variant}>
                  <Inner2 variant={this.props.variant}>
                    <CTAText variant={this.props.variant}>
                      Create My CV
                    </CTAText>
                  </Inner2>
                </Inner1>
              </CTA>
              {(this.props.variant == 7 || this.props.variant == 8 || this.props.variant == 12) && (
                <SectionList variant={this.props.variant}>
                  <SectionItem variant={this.props.variant}>
                    <p>Choose your <span>favorite template</span></p>
                  </SectionItem>
                  <SectionItem variant={this.props.variant}>
                    <p>Use our <span>pre-written examples</span></p>
                  </SectionItem>
                  <SectionItem variant={this.props.variant}>
                    <p>Get step-by-step <span>guidance</span></p>
                  </SectionItem>
                </SectionList>
              )}
              {(this.props.variant == 9 || this.props.variant == 10 || this.props.variant == 11) && (
                <SectionImg variant={this.props.variant}/>
              )}
            </>
            ) : (
            <>
              <SectionList variant={this.props.variant}>
                <SectionItem variant={this.props.variant}>
                  <p>Choose your <span>favorite template</span></p>
                </SectionItem>
                <SectionItem second variant={this.props.variant}>
                  <p>Use our <span>pre-written examples</span></p>
                </SectionItem>
                <SectionItem variant={this.props.variant}>
                  <p>Get step-by-step guidance &amp; <span>helpful tips</span></p>
                </SectionItem>
              </SectionList>
              <CTA variant={this.props.variant} onClick={this.onClickLandingCTA}>
                <Inner1 variant={this.props.variant}>
                  <Inner2 variant={this.props.variant}>
                    <CTAText variant={this.props.variant}>
                      Create My CV
                    </CTAText>
                  </Inner2>
                </Inner1>
              </CTA>
            </>
            )}
          </Section>
          <Footer>
            <span><a href="/terms-and-conditions" target="_blank">Terms and Conditions</a>&nbsp;&nbsp;<a href="/privacy-policy" target="_blank">Privacy Policy</a></span>
          </Footer>
        </ItemContent>
        <a className="b-hero__item b-hero__item_img" onClick={this.onClickLandingCTA}>
          <div className="b-hero__demo">
            <div className="b-hero__demo-item">
              <div className="b-hero__demo-img b-hero__demo-img_7_1">
                <div className="b-hero__demo-img-inner"></div>
              </div>
              <div className="b-hero__demo-img b-hero__demo-img_7_2">
                <div className="b-hero__demo-img-inner"></div>
              </div>
            </div>
          </div>
        </a>
      </Hero>
    );
  }
}

export default Landing;

const Hero = styled.div`
  display: flex;
  overflow: auto;
  height: 100vh;

  @media (max-width: 1500px) {
    min-width: 600px;
  }
  @media (max-height: 500px) {
    min-height: 500px;
  }
`;

const ItemContent = styled.div`
  width: 50%;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 710px;
  padding: 100px 40px;
  box-shadow: 0 10px 60px 0 rgba(10,26,51,.2);

  ${({ variant }) => {
    if (variant == 7 || variant == 8 || variant == 9) return css`
      padding: 100px 40px 60px;
    `;
    if (variant == 10) return css`
      padding: 40px 40px 100px;
    `;
  }}
  @media (max-width: 1500px) {
    min-width: 600px !important;
  }
    
  @media (max-width: 1640px) {
    padding: 100px 30px !important;
  }
`;

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 30px 40px !important;

  @media (max-width: 1640px) {
    padding: 30px !important;
  }
`;

const HeaderItem = styled.div`
`;

const HeaderLogo = styled.div`
  &::after {
    content: "Resumedone";
    display: block;
    margin: -3px 0;
    color: #000;
    font-size: 21px;
    line-height: 1;
    font-weight: 700;
    letter-spacing: -.04em;
  }
`;

const Section = styled.section`
  position: relative;
  max-width: 600px;

  ${({ variant }) => {
    if (variant == 4 || variant == 6) return css`
      position: static !important;
      @media (max-width: 1250px) {
        max-width: 410px !important;
      }
    `;
    if (variant == 7 || variant == 8 || variant == 9) return css`
      max-width: none;
    `;
    if (variant == 10 || variant == 12 || variant == 11) return css`
      position: static !important;
      max-width: none;
    `;
  }}
`;

const SectionHeading = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  margin-bottom: 60px !important;

  ${({ variant }) => {
    if (variant == 0 || variant == 1 || variant == 2) return css`
      border-bottom: 1px solid #000 !important;
      padding-bottom: 35px !important;

      &::before {
        left: 0;
      }
    
      &::after {
        right: 0;
      }
    
      &::after, &::before {
        content: "";
        position: absolute;
        bottom: -5px;
        width: 9px;
        height: 9px;
        background-color: #000;
      }  
    `
    if (variant == 7 || variant == 8) return css`
      text-align: center;
    `;

    if (variant == 9 || variant == 10 || variant == 11 || variant == 12) return css`
      margin-bottom: 55px;
      text-align: center;
    `;
  }}
`;

const SectionSubHeading = styled.p`
  margin: -12px 0 37px !important;
  color: #000;
  font-size: 32px !important;
  line-height: 48px !important;
  font-weight: 800 !important;
  letter-spacing: .04em;
  text-align: center;
`;

const SectionTitle = styled.h1`
  margin: -12px 0 21px !important;
  color: #000;
  line-height: 60px;
  letter-spacing: .04em;

  font-size: 48px !important;
  font-weight: 700 !important;

  ${({ variant }) => {
    if (variant == 4 || variant == 5 || variant == 8 || variant == 9 || variant == 10 || variant == 12) return css`
      margin: -16px 0 23px !important;
      line-height: 67px !important;
      font-weight: 800 !important;
    `;
    if (variant == 7) return css`
      margin-bottom: 31px !important;
    `;
  }}

  @media (max-width: 1500px) {
    margin: -12px 0 16px !important;
    font-size: 42px !important;
    line-height: 56px !important;
  }
`;

const HighLight = styled.span`
  color: #2274b0;
`;

const Large = styled.span`
  font-size: 70px !important;
  letter-spacing: .04em !important;
`;

const SectionDescription = styled.p`
  margin: -9px 0 -11px !important;
  color: #000;
  line-height: 2 !important;
  letter-spacing: .04em;

  font-size: 16px !important;
  font-style: italic !important;
  font-weight: 600 !important;
`;

const SectionList = styled.ul`
  counter-reset: a;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: -15px !important;

  ${({ variant }) => {
    if (variant == 1 || variant == 2 || variant == 3 || variant == 6) return css`
      margin: -20px -20px 45px !important;
    `;
    if (variant == 5) return css`
      margin: -20px -20px 35px !important;
    `;
    if (variant == 7 || variant == 8 || variant == 12) return css`
      flex-wrap: nowrap !important;
      margin: -10px !important;
    `;
  }}
`;

const SectionItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  width: calc(50% - 30px);
  max-width: none;
  min-height: 170px;
  margin: 15px !important;
  padding: 35px !important;
  background-color: #f5f5f5;

  ${({ variant }) => {
    if (variant == 1 || variant == 2) return css`
      padding: 0 0 0 30px !important;
    `;
    if (variant == 3 || variant == 4 || variant == 5) return css`
      padding: 0 0 0 60px !important;
    `;
    if (variant == 6) return css`
      padding: 0 0 0 32px !important;
    `;
    if (variant == 7 || variant == 8 || variant == 12) return css`
      width: auto !important;
      min-height: 0 !important;
      margin: 10px !important;
      padding: 0 0 200px 17px !important;
      background-color: transparent !important;
    `;
  }}

  ${({ second }) => second && css`
    margin-top: 100px !important;
    margin-bottom: -120px !important;
  `}

  ${({ variant }) => {
    if (variant == 1 || variant == 2 || variant == 3 || variant == 4 || variant == 5 || variant == 6) return css`
      width: calc(100% + 40px);
      min-height: 0;
      margin: 20px !important;
      background-color: transparent;
    `;
  }}

  &::before {
    content: counter(a) ".";
    counter-increment: a;
    position: absolute;
    top: 10px;
    right: calc(100% - 10px);
    color: #2274b0;
    font-size: 24px;
    line-height: 1;
    font-weight: 900;
    letter-spacing: .08em;

    ${({ variant }) => {
      if (variant == 1 || variant == 2) return css`
        position: absolute;
        top: 0;
        left: 0;
        right: auto;
        margin: -8px 0 -9px;
        color: #000;
        font-size: 15px;
        line-height: 28px;
        font-weight: 700;
        letter-spacing: .06em;
      `;
      if (variant == 3 || variant == 4 || variant == 5) return css`
        content: counter(a);
        position: absolute;
        top: 15px;
        left: 19px;
        right: auto;
        z-index: 1;
        margin: -9px 0 -10px;
        color: #2274b0;
        font-size: 12px;
        line-height: 28px;
        font-weight: 600;
        letter-spacing: .06em;
        -ms-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
      `;
      if (variant == 6) return css`
        top: -7px;
      `;
      if (variant == 7 || variant == 8 || variant == 12) return css`
        top: -6px;
        font-size: 18px;
      `;
    }}

    ${({ variant }) => {
      if (variant == 6 || variant == 7) return css`
        content: counter(a);
        left: 0;
        right: auto;
        font-size: 22px;
      `;
    }}
  }

  p {
    margin: -9px 0 -10px;
    color: #000;
    line-height: 30px !important;
    letter-spacing: .06em;

    font-size: 15px !important;
    font-weight: 500 !important;
    
    ${({ variant }) => {
      if (variant == 1 || variant == 2 || variant == 3 || variant == 4 || variant == 5 || variant == 6) return css`
        margin: -8px 0 -9px !important;
        line-height: 28px !important;
      `;
      if (variant == 7 || variant == 8 || variant == 12) return css`
        margin: -6px 0 -7px !important;
        font-size: 12px !important;
        line-height: 22px !important;
      `;
    }}

    span {
      font-weight: 800;
    }
  }

  &::after {
    ${({ variant }) => {
      if (variant == 3 || variant == 4 || variant == 5) return css`
        content: "";
        position: absolute;
        top: 11px;
        left: 6px;
        width: 27px;
        height: 27px;
        background-color: rgba(34,116,176,.15);
        -ms-transform: rotate(45deg) translate(-50%,-50%);
        transform: rotate(45deg) translate(-50%,-50%);
      `;
      if (variant == 7 || variant == 8 || variant == 12) return css`
        content: "";
        position: absolute;
        top: 20px;
        left: 50%;
        width: 100%;
        max-width: 285px;
        height: 230px;
        background: 50%/contain no-repeat;
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
        
      `;
    }}
  }
  
  :first-child {
    &::after {
      ${({ variant }) => (variant == 7 || variant == 8 || variant == 12) && css`
        background-image: url(../../media/img/b-hero/item_1.jpg);
      `};
    }
  }

  :nth-child(2n) {
    &::after {
      ${({ variant }) => (variant == 7 || variant == 8 || variant == 12) && css`
        background-image: url(../../media/img/b-hero/item_2.jpg);
      `};
    }
  }

  :last-child {
    &::after {
      ${({ variant }) => (variant == 7 || variant == 8 || variant == 12) && css`
        background-image: url(../../media/img/b-hero/item_3.jpg);
      `};
    }
  }

`;

const CTA = styled.a`
  position: absolute;
  bottom: 0;
  left: calc(50% + 15px);
  width: calc(50% - 15px);
  display: block;

  ${({ variant }) => {
    if (variant == 7 || variant == 8) return css`
      margin: 0 auto 70px !important;
    `;
    if (variant == 9) return css`
      margin: 0 auto 60px !important;
    `;
  }}

  &:hover {
    &::after {
      width: 120px;
    }

    &::before {
      bottom: 5px;
      right: -22px;

      ${({ variant }) => {
        if (variant == 4 || variant == 6 || variant == 10 || variant == 11 || variant == 12) return css`
          top: -65px;
          left: -65px;
          width: 250px;
          height: 250px;
          background-color: rgba(243,113,1,.1);
        `;
      }}
    }
  }

  &:active {
    &::after {
      width: 20px;
    }

    &::before {
      bottom: 0;
      right: 0;
      height: 100%;

      ${({ variant }) => {
        if (variant == 4 || variant == 6 || variant == 10 || variant == 11 || variant == 12) return css`
          top: 0;
          left: 0;
          width: 120px;
          height: 120px;
          background-color: rgba(243,113,1,0);
        `;
      }}
    }
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: -17px;
    width: 100%;
    height: calc(100% + 17px);
    background: rgba(243,113,1,.2);
    transition: all .2s;
  }
  
  ${({ variant }) => {
    if (variant == 1 || variant == 2 || variant == 3 || variant == 5 || variant == 7 || variant == 8 || variant == 9) return css`
      position: relative;
      bottom: auto;
      left: auto;
      width: 100%;
      max-width: 285px;
    `;
    if (variant == 4 || variant == 6 || variant == 10 || variant == 11 || variant == 12) return css`
      position: absolute !important;
      top: calc(50% - 60px) !important;
      bottom: auto !important;
      left: calc(100% - 60px) !important;
      width: auto !important;
    `
  }}

  &::before {
    ${({ variant }) => {
      if (variant == 2 || variant == 3) return css`
        top: -10px !important;
        bottom: auto !important;
        left: 10px !important;
        right: auto !important;
        height: calc(100% + 20px) !important;
        border: 1px solid rgba(243,113,1,.5);
        background-color: transparent;
      `;
  
      if (variant == 4 || variant == 6 || variant == 10 || variant == 11 || variant == 12) return css`
        top: -40px;
        bottom: auto;
        left: -40px;
        right: auto;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background-color: rgba(243,113,1,.2);
      `;
    }}
  }

  &::after {
    ${({ variant }) => {
      if (variant == 0 || variant == 1 || variant == 5) return css`
        content: "";
        position: absolute;
        top: calc(100% + 10px);
        left: 17px;
        width: calc(100% - 67px);
        height: 1px;
        background: #f37101;
        transition: all .2s;
      `;
    }}
  }
`;

const Inner1 = styled.span`
  position: relative;
  display: block;

  ${CTA}:hover & {
    &::before {
      left: -21px;
    }

    &::after {
      top: -21px;
    }
  }

  ${CTA}:active & {
    &::before {
      left: -25px;
    }

    &::after {
      top: -25px;
    }
  }

  ${({ variant }) => {
    if (variant == 0 || variant == 1 || variant == 5 ) return css`
      &::before {
        width: 20px;
        height: 1px;
      }
    
      &::before, &::after {
        content: "";
        position: absolute;
        top: -11px;
        left: -11px;
        background: #f37101;
        transition: all .2s;
      }
    
      &::after {
        width: 1px;
        height: 20px;
      }
    `;
  }}
`;

const Inner2 = styled.span`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 19px 25px !important;
  background: #f37101;
  box-shadow: 0 20px 60px 0 rgba(243,113,1,.3);
  transition: all .2s;

  ${CTA}:hover & {
    box-shadow: 0 20px 60px 0 rgba(243,113,1,.5);
  }

  ${({ variant }) => {
    if (variant == 2 || variant == 3) return css`
      box-shadow: none !important;
    `;

    if (variant == 4 || variant == 6 || variant == 10 || variant == 11 || variant == 12) return css`
      align-items: center;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      padding: 10px !important;
      box-shadow: 0 20px 60px 0 rgba(243,113,1,.17) !important;
    `;
  }}
`;

const CTAText = styled.span`
  position: relative;
  left: 0;
  display: block;
  padding-right: 60px !important;
  color: #fff;
  font-size: 14px !important;
  line-height: 24px !important;
  font-weight: 700 !important;
  letter-spacing: .06em;
  text-align: center;
  text-transform: uppercase;
  transition: all .2s;

  ${({ variant }) => {
    if (variant == 4 || variant == 6 || variant == 10 || variant == 11 || variant == 12) return css`
      left: 0!important;
      padding-right: 0 !important;
      font-size: 12px !important;
    `;
    else {
      return css`
        &::after {
          position: absolute;
          top: 6px;
          right: 0;
          color: #fff;
          font-size: 13px;
        }
      
        &::after {
          content: "\\e903";
        }
      
        &::after {
          font-family: icomoon!important;
          font-style: normal;
          font-weight: 400;
          font-variant: normal;
          line-height: 1;
          letter-spacing: 0;
          text-transform: none;
          speak: none;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: greyscale;
          text-rendering: optimizeLegibility;
          -moz-osx-font-smoothing: grayscale;
          font-feature-settings: "liga";
        }
      
        ${CTA}:active & {
          left: 8px;
        }
      `;
    }
  }}
`;

const SectionImg = styled.div`
  ${({ variant }) => variant == 11
    ? css`
      width: 380px;
      height: 324px;
    `
    : css`
      width: 285px;
      height: 230px;
    `}
  margin: 0 auto !important;
  background: url(../../media/img/b-hero/item_2.jpg) 50%/contain no-repeat;
`;
