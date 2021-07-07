import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { Link as LinkAtom } from 'react-router-dom';

import { withAccount } from '/imports/core/api/accounts/accountContext';
import { Flex, List, ListItem } from '/imports/core/ui/atoms';
import Logo from '/imports/core/ui/components/Logo';

@withAccount
class Navbar extends PureComponent {
  state = { open: false };

  toggleNavigation = () => this.setState(st => ({ open: !st.open }));

  render() {
    const { open } = this.state;
    const { currentUser } = this.props;
    return (
      <TopHeader>
        <div>
          <Logo light huge />
        </div>
        <MenuButton open={open} toggleNavigation={this.toggleNavigation} />
        <Menu open={open}>
          <MenuItem>
            <Link to={currentUser ? '/resumes' : '/sign-in'}>
              {currentUser && currentUser.personalData && currentUser.personalData.firstName
                ? currentUser.personalData.firstName
                : 'Sign in'}
            </Link>
          </MenuItem>
        </Menu>
      </TopHeader>
    );
  }
}

const MenuButton = ({ open, toggleNavigation }) => {
  return open ?
    <MenuIcon onClick={toggleNavigation} fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
      <path d="M0 0h24v24H0z" fill="none"></path>
    </MenuIcon> :
    <MenuIcon onClick={toggleNavigation} fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
    </MenuIcon>
}

const TopHeader = styled(Flex)`
  background: ${p => p.theme.colors.darkBlack};
  text-align: left;
  color: #ffffff;
  padding: 3px 10px;
  align-items: center;
  font-family: ${({ theme }) => theme.font.family.tahoma};
  margin: 0;
  > div {
    &:nth-child(1) {
      flex-grow: 1;
    }
  }
  ${({ theme }) => theme.max('sm')`
    padding: 10px;
  `}
  ${({ theme }) => theme.max('xs')`
    line-height: 2.4rem;
    padding-top: 0;
    padding-bottom: 0;
    margin: 0;
  `}
`;

const Menu = styled(List)`
  margin: 0;
  ${({ theme }) => theme.max('sm')`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    z-index: ${({ theme }) => theme.zIndex.headerFixed};
    top: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.88);
    transform: translateX(100vw);
    padding: 20px 0 0 0;
    visibility: hidden;
    ${p => p.open && css`
      visibility: visible;
      // transition: all .4s ease;
      transform: translateX(0);
    `}
  `}
`;

const MenuItem = styled(ListItem)`
  display: inline-block;
  padding: 8px 18px;
  &:last-child {
    padding-right: 0;
  }
  ${({ theme }) => theme.max('sm')`
    display: block;
    padding: 20px;
    &:last-child {
      padding-right: 18px;
    }
  `}
`;

const Link = styled(LinkAtom)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  ${({ theme }) => theme.max('sm')`
    padding: 20px 0;
    font-size: 16px;
  `}
`;

const MenuIcon = styled.svg`
  z-index: ${({ theme }) => theme.zIndex.headerFixed + 1};
  position: relative;
  width: 34px;
  height: 34px;
  fill: #fff;
  display: none;
  cursor: pointer;
  ${({ theme }) => theme.max('sm')`
    display: inline-block;
  `}
`;


export default Navbar;
