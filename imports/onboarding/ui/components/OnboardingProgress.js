import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Flex } from '/imports/core/ui/atoms';

class OnboardingProgress extends PureComponent {
  static propTypes = {
    progress: PropTypes.number,
    sections: PropTypes.number,
  };

  static defaultProps = {
    progress: 0,
    sections: 1,
  };

  render() {
    const { progress, sections } = this.props;
    const length = sections - 1;
    const width = `${progress * 100}%`;
    return (
      <Progress>
        <Inner width={width}/>
        <Circles>
          <Circle isCheck/>
          {Array(length).fill(1).map((x, i) => <Circle key={i} isCheck={(i + 1) / sections <= progress}/>)}
          <Circle isCheck={progress === 1}/>
        </Circles>
      </Progress>
    );
  }
}

const Progress = styled.div`
  width: 500px;
  height: 4px;
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.gray.light};
  position: relative;
  margin: 22px 0;
  ${({ theme }) => theme.max('md')`
    display: none;
  `}
`;

const Inner = styled.div`
  height: 100%;
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.primary};
  // transition: width 0.4s ease;
  will-change: width;
  width: ${({ width }) => width};
`;

const Circles = styled(p => <Flex {...p} justifyContent="space-between"/>)`
  position: absolute;
  top: 0;
  left: -4px;
  right: -4px;
  bottom: 0;
`;

const Circle = styled.div`
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 8px;
  border: 5px solid ${({ theme }) => theme.colors.gray.light};
  position: relative;
  top: -6px;
  // transition: border-color 0.1s ease 0s;
  ${({ isCheck }) => isCheck && css`
    border-color: ${({ theme }) => theme.colors.primary};
    // transition: border-color 0.1s ease 0.25s;
  `};
`;


export default OnboardingProgress;
