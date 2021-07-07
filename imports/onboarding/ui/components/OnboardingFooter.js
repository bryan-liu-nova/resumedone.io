import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Link } from '/imports/core/ui/atoms';
import { rgba } from 'polished';
import { withRouter } from 'react-router-dom';

import { Container, Flex } from '/imports/core/ui/atoms';

const links = [
  { href: '#', title: 'Contact us' },
  { href: '/privacy-policy', title: 'Privacy' },
  { href: '/terms-and-conditions', title: 'Terms of service' },
];

@withRouter
class OnboardingFooter extends PureComponent {
  state = {
    hide: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return { hide: nextProps.location.pathname === '/onboard/start' };
  }

  render() {
    return (
      <FooterContainer hide={this.state.hide}>
        <FooterContent>
          <FooterLinks>
            {links.map(({ title, href }, index) =>
              <FooterLink key={index} href={href} target="_blank">{title}</FooterLink>)}
          </FooterLinks>
        </FooterContent>
      </FooterContainer>
    );
  }
}

const FooterContainer = styled(Container)`
  background-color: #f9fafc;
  & {
    width: 100%;
  }
  ${p => p.theme.max('md')`
    height: 240px;
  `}
  ${p => p.hide && p.theme.max('sm')`
    display: none;
  `}
`;

const FooterContent = styled.div`
  max-height: 102px; 
  padding: 32px 24px 46px 24px;
  position: relative;
  &:before {
    content: '';
    width: 64px;
    height: 1px;
    display: block;
    top: 0;
    left: 50%;
    margin-left: -32px;
    background-color: ${({ theme }) => rgba(theme.colors.gray.light, 0.5)};
    position: absolute;
  }
`;

const FooterLinks = styled(p => <Flex alignItems="center" justifyContent="center" {...p}/>)`
  ${({ theme }) => theme.max('md')`
    flex-flow: column nowrap;
  `};
`;

const FooterLink = styled(p => <Link {...p} />)`
 color: ${({ theme }) => theme.colors.gray.light};
 margin: 0 16px;
 text-decoration: none;
 line-height: 24px;
 ${({ theme }) => theme.max('md')`
    margin: 8px;
 `}
`;

export default OnboardingFooter;
