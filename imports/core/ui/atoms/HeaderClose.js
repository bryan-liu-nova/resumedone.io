import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '/imports/core/ui/helpers';
import Box from './Box';

class HeaderClose extends PureComponent {
  render() {
    return (
      <CloseCont onClick={this.props.onClick} hiddenMD hiddenLG>
        <Line opened={this.props.opened} />
        <Line  opened={this.props.opened} bottom />
      </CloseCont>
    );
  }
}

const CloseCont = styled(Box)`
  position:absolute;
  top: 50%;
  left: ${theme('general.mobilePadding')};
  width: 25px;
  height: 25px;
  z-index: 10;
`;

const Line = styled.div`
  width: 100%;
  top: 50%;
  height: 2px;
  background: ${theme('colors.black')};
  transform: translate(0, -300%);
  transform-origin: center center;
  // transition: .3s ease;
  ${props => props.bottom && css`
    transform: translate(0, 0); 
  `}
  ${props => props.opened && css`
    transform: translate(0, -100%) rotate(45deg);
  `}
  ${props => props.opened && props.bottom && css`
    transform: translate(0, -200%) rotate(-45deg);
  `}
  ${props => props.opened && css`
    background: white;
  `}
`;

export default HeaderClose;
