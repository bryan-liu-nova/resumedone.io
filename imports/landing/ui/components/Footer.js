import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  LandingSection,
  LandingText,
  LandingContainer
} from '/imports/landing/ui/atoms';
import Logo from '/imports/core/ui/components/Logo';

class Introduction extends PureComponent {
  render() {
    return (
      <FooterContainer>
        <LandingSection>
          <LandingContainer relative>
            <FooterLogo />
            <FooterText>
              <Link to='/'>2019 © resumedone.io</Link>
            </FooterText>
          </LandingContainer>
        </LandingSection>
      </FooterContainer>
    );
  }
}

const FooterContainer = styled.section`
  position: relative;
  height: 5rem;
  text-align: center;
  padding: 0;
  background: ${p => p.theme.colors.black};
  display: flex;
  align-items: center;
`;

const FooterText = styled(p => <LandingText {...p}/>)`
  color: ${({ theme }) => theme.colors.gray.darker};
  margin: 0;
  text-align: center;
  line-height: 1.375rem;
  font-size: 0.875rem;
  & > a {
    text-transform: none;
    color: #606060;
    text-decoration: none;
  }
  &:hover > a {
    text-decoration: underline;
  }
  ${p => p.theme.max('sm')`
    margin-top: 40px;
  `}
`;

const FooterLogo = styled(p => <Logo white huge {...p} />)`
  position: absolute;
  top: -11px;
  left: 0;
  ${p => p.theme.max('sm')`
    left: 50%;
    top: -37px;
    transform: translate(-50%, 0);
  `}
`;


export default Introduction;