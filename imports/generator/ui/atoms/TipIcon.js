import React, { PureComponent } from 'react';
import styled from 'styled-components';

class TipIcon extends PureComponent {
  render() {
    return (
      <QuestionCont data-tip={this.props.tip} />
    );
  }
}

const QuestionCont = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  font-size: 11px;
  text-align: center;
  line-height: 14px;
  margin-left: 5px;
  font-weight: 500;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.primary};
  &:after {
    content: "?";
    display: block;
    margin-top: 1px;
  }
  ${p => p.theme.max('lg')`
    display: none;
  `}
`;

export default TipIcon;
