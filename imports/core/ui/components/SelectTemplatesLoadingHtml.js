import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Cover } from '/imports/core/ui/atoms';

import '../../../../public/css/preloader.css';

class Loading extends PureComponent {
  state = {
    running: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ running: true });
    }, 1000);
  }

  render() {
    const { running } = this.state;
    const mainClass = `b-preloader-3 ${running ? 'b-preloader-3_running' : ''}`;
    return (
      <LoadingCont>
        <div className={mainClass}>
          <div className="b-preloader-3__list">
            <div className="b-preloader-3__list-inner">
              <div className="b-preloader-3__list-item b-preloader-3__list-item_1">
                <PreloaderBox className="b-preloader-3__box">
                  <svg className="s-tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12.01" height="12px" style={{ position: 'absolute', left: '11px', top: '13px' }}>
                    <path d="M5.74,12a1.22,1.22,0,0,1-.88-.37L.33,6.83A1.2,1.2,0,0,1,2.07,5.17L5.74,9.06,13.92.38A1.2,1.2,0,0,1,15.61.32h0A1.21,1.21,0,0,1,15.67,2L6.61,11.64A1.18,1.18,0,0,1,5.74,12Z"></path>
                  </svg>
                  <p className="b-preloader-3__text">Loading 20 Professional Resume Designs</p>
                </PreloaderBox>
              </div>
              <div className="b-preloader-3__list-item b-preloader-3__list-item_2">
                <div className="b-preloader-3__box">
                  <SVG className="s-tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12.01" height="12px">
                    <path d="M5.74,12a1.22,1.22,0,0,1-.88-.37L.33,6.83A1.2,1.2,0,0,1,2.07,5.17L5.74,9.06,13.92.38A1.2,1.2,0,0,1,15.61.32h0A1.21,1.21,0,0,1,15.67,2L6.61,11.64A1.18,1.18,0,0,1,5.74,12Z"></path>
                  </SVG>
                  <p className="b-preloader-3__text">Loading 282 Pre-written Samples</p>
                </div>
              </div>
              <div className="b-preloader-3__list-item b-preloader-3__list-item_3">
                <div className="b-preloader-3__box">
                  <SVG className="s-tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12.01" height="12px">
                    <path d="M5.74,12a1.22,1.22,0,0,1-.88-.37L.33,6.83A1.2,1.2,0,0,1,2.07,5.17L5.74,9.06,13.92.38A1.2,1.2,0,0,1,15.61.32h0A1.21,1.21,0,0,1,15.67,2L6.61,11.64A1.18,1.18,0,0,1,5.74,12Z"></path>
                  </SVG>
                  <p className="b-preloader-3__text">Loading 152 Writing Tips</p>
                </div>
              </div>
              <div className="b-preloader-3__list-item b-preloader-3__list-item_4">
                <div className="b-preloader-3__box">
                  <SVG className="s-tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12.01" height="12px">
                    <path d="M5.74,12a1.22,1.22,0,0,1-.88-.37L.33,6.83A1.2,1.2,0,0,1,2.07,5.17L5.74,9.06,13.92.38A1.2,1.2,0,0,1,15.61.32h0A1.21,1.21,0,0,1,15.67,2L6.61,11.64A1.18,1.18,0,0,1,5.74,12Z"></path>
                  </SVG>
                  <p className="b-preloader-3__text">Loading Customer Service Help</p>
                </div>
              </div>
              <div className="b-preloader-3__list-item b-preloader-3__list-item_5">
                <div className="b-preloader-3__box">
                  <SVG className="s-tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12.01" height="12px">
                    <path d="M5.74,12a1.22,1.22,0,0,1-.88-.37L.33,6.83A1.2,1.2,0,0,1,2.07,5.17L5.74,9.06,13.92.38A1.2,1.2,0,0,1,15.61.32h0A1.21,1.21,0,0,1,15.67,2L6.61,11.64A1.18,1.18,0,0,1,5.74,12Z"></path>
                  </SVG>
                  <p className="b-preloader-3__text">Loading Fonts and Design Tools</p>
                </div>
              </div>
              <div className="b-preloader-3__list-item b-preloader-3__list-item_6">
                <div className="b-preloader-3__box">
                  <SVG className="s-tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12.01" height="12px">
                    <path d="M5.74,12a1.22,1.22,0,0,1-.88-.37L.33,6.83A1.2,1.2,0,0,1,2.07,5.17L5.74,9.06,13.92.38A1.2,1.2,0,0,1,15.61.32h0A1.21,1.21,0,0,1,15.67,2L6.61,11.64A1.18,1.18,0,0,1,5.74,12Z"></path>
                  </SVG>
                  <p className="b-preloader-3__text">Finished</p>
                </div>
              </div>
            </div>
          </div>
          <div className="b-preloader-3__logo"></div>
        </div>
      </LoadingCont>
    );
  }
}

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

const SVG = styled.svg`
  position: absolute;
  top: 13px;
  left: 11px;
  opacity: 1;
  height: 12px;
`;

const PreloaderBox = styled.div`
  position: relative;
  padding: 14px 0 14px 68px;
`;

export default Loading;