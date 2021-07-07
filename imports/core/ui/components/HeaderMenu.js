import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Container, List, ListItem, Link } from '/imports/core/ui/atoms';
import { hiddenMixin } from '/imports/core/ui/helpers';

class Menu extends PureComponent {
  render() {
    return (
      <MenuList hiddenSM>
        {this.props.items.map(({ name, link }, index) => (
          <MenuListItem key={index}>
            <Link href={link}>
              {name}
            </Link>
          </MenuListItem>
        ))}
      </MenuList>
    );
  }
}

const MenuListItem = styled(p => <ListItem {...p} />)`
  font-family: ${p => p.theme.font.family.openSans};
  font-size: 15px;
  display: inline-block;
  color: #fff;
  margin: 0 15px;
  padding: 5px 0 6px;
  & a {
    color: #fff;
    text-decoration: none;
  }
  &:hover a {
    text-decoration: underline;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const MenuList = styled(p => <List {...p} />)`
  ${hiddenMixin}
`;

export default Menu;