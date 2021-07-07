import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';

import OnboardingHeader from '/imports/onboarding/ui/components/OnboardingHeader';
import OnboardingFooter from '/imports/onboarding/ui/components/OnboardingFooter';

@withRouter
class OnboardingLayout extends PureComponent {
  state = {
    hide: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return { hide: nextProps.location.pathname === '/onboard/start' };
  }

  render() {
    return (
      <>
        <OnboardingHeader onSelect={this.props.onSelect} experiment={this.props.experiment}/>
        <Main hide={this.state.hide} experiment={this.props.experiment}>{this.props.children}</Main>
        {this.props.experiment < '4' && <OnboardingFooter/>}
      </>
    );
  }
}

const Main = styled.main`
  min-height: ${({ experiment }) => experiment >= '4' ? '100vh' : 'calc(100vh - 102px)'};
  background-color: #f9fafc;
  padding: 18px 16px 48px;
  overflow: hidden;
  ${({ theme }) => theme.max('md')`
    min-height: calc(100vh - 240px);  
  `}
  ${p => p.hide && p.theme.max('sm')`
    min-height: 100vh;
  `}


  ${({ experiment }) => {
    if (experiment == '1' || experiment == '2' || experiment >= '4') {
      return css`
        &::before {
          content: "";
          position: absolute;
          top: 45px;
          left: -80px;
          width: 277px;
          height: 330px;
          background: url(../../media/img/b-section-steps/bg.png) 0/contain no-repeat;
        }
      `;
    }
  }}
`;

export default OnboardingLayout;
