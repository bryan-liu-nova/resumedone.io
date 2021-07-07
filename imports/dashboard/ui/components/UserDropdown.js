import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

import history from '/imports/core/api/history';
import { Button, Icon } from '/imports/core/ui/atoms';
import { BarIcon } from '/imports/dashboard/ui/atoms';
import { logout } from '/imports/core/api/actions';
import { ResponsiveConsumer } from '/imports/core/api/responsiveContext';
import { AccountConsumer } from '/imports/core/api/accounts/accountContext';

class UserDropdown extends PureComponent {
  state = {
    expanded: false
  };

  componentWillUnmount() {
    window.removeEventListener('click', this.windowClick);
  }

  windowClick = () => {
    this.setState({ expanded: false });
    window.removeEventListener('click', this.windowClick);
  };

  toggleExpanded = (e) => {
    e.stopPropagation();
    if(this.state.expanded === false) {
      window.addEventListener('click', this.windowClick);
    } else {
      window.removeEventListener('click', this.windowClick);
    }
    this.setState(st => ({ expanded: !st.expanded }));
  };

  goToCheckout = () => history.push('/checkout');

  render() {
    const { expanded } = this.state;
    return (
      <AccountConsumer>
        {({ currentUser }) => (
          <ResponsiveConsumer>
            {({ isMobile }) => (
              <DropdownCont>
                <Button onClick={this.toggleExpanded} link>
                  <TopName>{currentUser.personalData.firstName} {currentUser.personalData.lastName}</TopName>
                  {isMobile ? (
                    <BarIcon opened={expanded} />
                  ) : (
                    <IconCont icon={`chevron-${expanded ? 'up' : 'down'}`} />
                  )}
                </Button>
                <DropdownMenu expanded={expanded} onClick={e => e.stopPropagation()}>
                  <Name>{currentUser.personalData.firstName} {currentUser.personalData.lastName}</Name>
                  {!currentUser.serviceData.subscriptionId && localStorage.getItem('resumedone:checkout-seen') && (
                    <Button link onClick={this.goToCheckout}>Get premium</Button>
                  )}
                  <Button link onClick={() => history.push('/account')}>Account settings</Button>
                  <Button onClick={logout} link>Log out</Button>
                </DropdownMenu>
              </DropdownCont>
            )}
          </ResponsiveConsumer>
        )}
      </AccountConsumer>
    )
  }
}

const DropdownCont = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  > button {
    font-size: 32px;
    display: flex;
    &:hover {
      p {
        color: ${p => p.theme.colors.primary};
      }
      i {
        color: ${p => p.theme.colors.primary};
      }
    }
  }
  ${p => p.theme.max('md')`
    position: static;
  `}
`;

const Name = styled.p`
  font-size: ${p => p.theme.font.size.h3};
  margin-top: 0;
  font-weight: 500;
  margin-bottom: 30px;
  ${p => p.theme.min('md')`
    display: none;
  `}
`;

const TopName = styled.p`
  font-size: ${p => p.theme.font.size.h5};
  font-weight: 500;
  margin-right: 10px;
  ${p => p.theme.max('md')`
    display: none;
  `}
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 40px;
  background: white;
  width: 170px;
  border-radius: ${p => p.theme.general.borderRadius};
  padding: 10px;
  // transition: ${p => p.theme.transitions.fast};
  transform-origin: top;
  transform: scaleY(0);
  opacity: 0;
  box-shadow: rgba(207, 214, 230, 0.7) 0px 14px 16px -10px, rgba(207, 214, 230, 0.12) 0px 20px 40px -8px;
  ${p => p.expanded && css`
    transform: scaleY(1);
    opacity: 1;
  `}
  ${p => p.theme.max('md')`
    width: 100%;
    padding: ${p.theme.general.mobilePadding};
    left: 0;
    border-radius: 0;
    top: ${p.theme.general.headerHeight};
    > button {
      display: block;
      margin-bottom: 20px !important;
    }
  `}
  button {
    font-size: 16px;
    margin: 7px 0;
    font-weight: 500;
    color: ${p => p.theme.colors.black};
    &:first-of-type {
      color: ${p => p.theme.colors.primary};
    }
    &:hover {
      color: ${p => p.theme.colors.primary};
    }
  }
`;

const IconCont = styled(p => <Icon {...p} />)`
  font-size: 22px;
  margin: auto;
  padding-top: 4px;
`;

export default UserDropdown;
