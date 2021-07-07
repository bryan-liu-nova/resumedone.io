import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { displayTemplateTitle } from '/imports/generator/api/helpers';

import { View } from '/imports/pdf/core/ui/atoms';

const LENGTH = 47;

class CircleText extends PureComponent {
  render() {
    const { firstName, lastName } = this.props;
    if(!firstName && !lastName) return null;
    let fullName = displayTemplateTitle(firstName, lastName, ' ') + ' ';
    const l = fullName.length;
    let add = 0, n = 1, ost = 0;
    if(l > 23 && l < LENGTH) {
      ost = LENGTH - l;
      add = ost / 2;
      fullName = fullName.replace(' ', ' '.repeat(parseInt(l > 36 ? add : add + 3)));
    } else {
      n = parseInt(LENGTH / l);
      ost = LENGTH - n * l;
      add = ost / n;
      fullName += ' '.repeat(parseInt(l > 21 ? add : add + 1));
    }
    return (
      <Container>
        <SVG viewBox="0 0 100 100">
          <path d="M 50, 50 m -50, 0 a 50,50 0 1,0 100,0 a 50,50 0 1,0 -100,0" id="curve"></path>
          <text>
            <textPath xlinkHref="#curve">
              {fullName.repeat(n ? n : 1)}
            </textPath>
          </text>
        </SVG>
        <Logo>
          <span>
            {firstName && firstName.charAt(0)}
          </span>
          {(firstName && lastName) && <div />}
          <span>
            {lastName && lastName.charAt(0)}
          </span>
        </Logo>
      </Container>
    );
  }
}

const Container = styled(View)`
  width: 25%;
  position: relative;
`;

const SVG = styled.svg`
  width: 100px;
  height: 100px;
  overflow: visible;
  position: absolute;
  top: -26px;
  right: 0;
  path {
    fill: transparent;
  }
  text {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #808389;
    white-space: pre;
  }
`;

const Logo = styled(View)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100px;
  height: 100px;
  top: -26px;
  right: 0;
  span {
    font-family: 'Raleway Light';
    text-transform: uppercase;
    font-size: 28px;
    line-height: 0.8em;
    color: #808389;
  }
  div {
    width: 20px;
    height: 1px;
    background: #808389;
    margin-bottom: 2px;
  }
`;

export default CircleText;