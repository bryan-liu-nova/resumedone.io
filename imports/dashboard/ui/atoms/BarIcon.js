import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

class BarIcon extends PureComponent {
  render() {
    return (
      <Cont hiddenMD hiddenLG>
        <Line opened={this.props.opened} />
        <Line  opened={this.props.opened} bottom />
      </Cont>
    );
  }
}

const Cont = styled.div`
  position:absolute;
  top: 50%;
  right: ${p => p.theme.general.mobilePadding};
  width: 25px;
  height: 25px;
  z-index: 10;
`;

const Line = styled.div`
  width: 100%;
  top: 50%;
  height: 2px;
  background: ${p => p.theme.colors.primary};
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
`;

export default BarIcon;
