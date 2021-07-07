import React, { PureComponent } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Cover } from '/imports/core/ui/atoms';

const steps = [
  "Loading 20 Professional Resume Designs",
  "Loading 282 Pre-written Samples",
  "Loading 152 Writing Tips",
  "Loading Customer Service Help",
  "Loading Fonts and Design Tools",
  "Finished"
];

const delays = ["-1.4s", "0s", "1.4s", "2.8s", "4.2s", "5.6s"];

class Loading extends PureComponent {
  state = {
    running: false,
  };

  componentDidMount() {
    window.analytics.track('Loadingpage_view');
    setTimeout(() => {
      this.setState({ running: true });
    }, 1000);
  }

  render() {
    const { running } = this.state;
    return (
      <LoadingCont>
        <PreloaderList>
          <PreloaderListInner>
            {steps.map((step, index) => (
              <PreloaderListItem key={index}>
                <PreloaderBox level={index}>
                  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12.01" height="12px">
                    <path d="M5.74,12a1.22,1.22,0,0,1-.88-.37L.33,6.83A1.2,1.2,0,0,1,2.07,5.17L5.74,9.06,13.92.38A1.2,1.2,0,0,1,15.61.32h0A1.21,1.21,0,0,1,15.67,2L6.61,11.64A1.18,1.18,0,0,1,5.74,12Z"></path>
                  </SVG>
                  <p>{step}</p>
                </PreloaderBox>
              </PreloaderListItem>
            ))}
          </PreloaderListInner>
        </PreloaderList>
        <PreloaderLogo />
      </LoadingCont>
    );
  }
}

const b = keyframes`
    0% {
        background-color: rgba(119, 179, 0, 0)
    }
    16% {
        background-color: rgba(119, 179, 0, 0)
    }
    20% {
        background-color: rgba(119, 179, 0, 0.6)
    }
    36% {
        background-color: rgba(119, 179, 0, 0.6)
    }
    40% {
        background-color: rgba(119, 179, 0, 0.4)
    }
    56% {
        background-color: rgba(119, 179, 0, 0.4)
    }
    to {
        background-color: rgba(119, 179, 0, 0.4)
    }
`;

const c = keyframes`
    0% {
        background-color: rgba(119, 179, 0, 0)
    }
    16% {
        background-color: rgba(119, 179, 0, 0)
    }
    20% {
        background-color: rgba(119, 179, 0, 0.6)
    }
    36% {
        background-color: rgba(119, 179, 0, 0.6)
    }
    to {
        background-color: rgba(119, 179, 0, 0.6)
    }
`;

const d = keyframes`
    0% {
        opacity: 1
    }
    16% {
        opacity: 1
    }
    20% {
        fill: #fff
    }
    36% {
        opacity: 1;
        fill: #fff
    }
    40% {
        opacity: 0
    }
    56% {
        opacity: 0
    }
    to {
        opacity: 0
    }
`;

const e = keyframes`
    0% {
        opacity: 1
    }
    16% {
        opacity: 1
    }
    20% {
        fill: #fff
    }
    36% {
        opacity: 1;
        fill: #fff
    }
    to {
        opacity: 1;
        fill: #fff
    }
`;

const f = keyframes`
    0% {
        top: 58px
    }
    16% {
        top: 58px
    }
    20% {
        top: -10px
    }
    36% {
        top: -10px
    }
    40% {
        top: -68px
    }
    56% {
        top: -68px
    }
    60% {
        top: -126px
    }
    76% {
        top: -126px
    }
    80% {
        top: -184px
    }
    96% {
        top: -184px
    }
    to {
        top: -242px
    }
`;

const LoadingCont = styled(Cover)`
  font-family: Poppins;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #fff;
  z-index: 9999;
`;

const PreloaderList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 390px;
  height: 154px;
  overflow: hidden;
  &:after, &:before {
    content: "";
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 48px;
    pointer-events: none;
  }
  &:after {
    bottom: 0;
    background-image: linear-gradient(0deg,#fff,hsla(0,0%,100%,0));
  }
  &:before {
    top: 0;
    background-image: linear-gradient(180deg,#fff,hsla(0,0%,100%,0));
   }
`;

const PreloaderListInner = styled.div`
    position: relative;
    margin: -10px !important;
    animation: ${f} 7s linear forwards;
`;

const PreloaderListItem = styled.div`
  padding: 10px !important;
`;

const PreloaderBox = styled.div`
  position: relative;
  padding: 14px 0 14px 68px !important;
  &:before, &:after {
    font-family: icomoon;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    line-height: 1;
    letter-spacing: 0;
    text-transform: none;
    speak: none;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: "liga";
    box-sizing: border-box;
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 2px solid #77b300;
    background-color: rgba(119, 179, 0, 1);
    animation-delay: ${p => delays[p.level]};
    animation: ${b} 5s linear forwards;
    ${p => p.level === 5 && css`
      animation: ${c} 5s linear forwards
    `}
  }
  &:after {
    position: absolute;
    top: 10px;
    left: 10px;
    opacity: 1;
    color: #77b300;
    font-size: 24px;
    animation-delay: ${p => delays[p.level]};
    animation: ${d} 5s linear forwards;
    ${p => p.level === 5 && css`
      animation: ${e} 5s linear forwards;
    `}
  }
  p {
    margin: -7px 0 !important;
    color: #000;
    font-size: 14px !important;
    line-height: 24px !important;
    font-weight: 500 !important;
    letter-spacing: .06em !important;
  }
`;

const PreloaderLogo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 45px;
  &:after {
    content: "Resumedone";
    position: absolute;
    bottom: 0;
    left: 50%;
    display: block;
    margin: -37px 0 -54px;
    color: #f0f0f2;
    font-size: 16.25vw;
    line-height: 1;
    font-weight: 700;
    letter-spacing: -.04em;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
  }
`;

const SVG = styled.svg`
  position: absolute;
  top: 13px;
  left: 12px;
  opacity: 1;
  height: 12px;
  path {
    fill: #77b300;
    animation: ${d} 7s linear forwards paused;
  }
`;

export default Loading;