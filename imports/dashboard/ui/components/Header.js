import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Link as LinkAtom, withRouter } from 'react-router-dom';

import { withAccount } from '/imports/core/api/accounts/accountContext';
import { Container, Flex, Box, Button, Icon, Separator } from '/imports/core/ui/atoms';
import Logo from '/imports/core/ui/components/Logo';
import UserDropdown from './UserDropdown';
import history from '/imports/core/api/history';

@withAccount
@withRouter
class Header extends PureComponent {
  goToCheckout = () => history.push('/checkout');

  isCurrentPath = (path) => {
    const { pathname } = this.props.location;
    return path === pathname;
  };

  showUpgrade = () => {
    const { currentUser: { serviceData: { subscriptionId } } } = this.props;
    return !subscriptionId && localStorage.getItem('resumedone:checkout-seen');
  };

  render() {
    return (
      <HeaderCont>
        <ContainerCont>
          <Flex alignItems="center">
            <Box>
              <Logo path="/resumes"/>
            </Box>
            <Box grow={1}>
              <NavCont>
                {this.showUpgrade() && (
                  <Button cta hiddenSM hiddenXS onClick={this.goToCheckout}>
                    <Icon icon="award"/> Upgrade
                  </Button>
                )}
                <NavLinks>
                  <Link current={this.isCurrentPath('/resumes')} to="/resumes">Dashboard</Link>
                </NavLinks>
                <Separator/>
                <UserDropdown/>
              </NavCont>
            </Box>
          </Flex>
        </ContainerCont>
      </HeaderCont>
    );
  }
}

const HeaderCont = styled.header`
  height: ${p => p.theme.general.headerHeight};
  background-color: white;
  > section {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  ${({ theme }) => theme.max('md')`
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: ${theme.zIndex.headerFixed};
    padding: 0 ${theme.general.mobilePadding};
  `}
`;

const NavCont = styled(Flex)`
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
`;

const ContainerCont = styled(Container)`
  width: 100%;
  padding: 0 32px;
  ${p => p.theme.min('lg')`
    width: 100%;
  `}
  ${p => p.theme.max('sm')`
    padding: 0;
  `}
`;

const Link = styled(LinkAtom)`
  text-decoration: none;
  color: ${({ theme, current }) => current && theme.colors.gray.regular || theme.colors.black};
  padding: 8px 20px;
  &:last-of-type {
    padding-right: 0;
  }
  &:hover {
    color: ${({ theme, current }) => current && theme.colors.gray.regular || theme.colors.primary};
  }
`;

const NavLinks = styled.div`
  ${({ theme }) => theme.max('sm')`
      display: none;
   `}
`;

export default Header;
