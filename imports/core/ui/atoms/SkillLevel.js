import React, { PureComponent } from 'react';
import styled from 'styled-components';
import capitalize from 'lodash/capitalize';
import { rgba } from 'polished';

import { Label, Button } from '/imports/core/ui/atoms';

const LEVELS = [
  'NOVICE',
  'BEGINNER',
  'SKILLFUL',
  'EXPERIENCED',
  'EXPERT'
];

const COLORS_MAP = {
  NOVICE: 'danger',
  BEGINNER: 'warning',
  SKILLFUL: 'yellow',
  EXPERIENCED: 'lightGreen',
  EXPERT: 'success'
};

class SkillLevel extends PureComponent {
  state = {
    level: this.props.value || 'NOVICE'
  };

  setLevel = level => {
    this.setState({ level });
    this.props.onChange({ target: { value: level } });
  };

  render() {
    const { level } = this.state;
    return (
      <>
        <Label>Level - <Level level={level}>{capitalize(level.toLowerCase())}</Level></Label>
        <LevelInput level={level}>
          {LEVELS.map((l, i) => (
            <LevelButton
              key={`level-${i}`}
              level={level}
              onClick={() => this.setLevel(l)}
            />
          ))}
        </LevelInput>
      </>
    );
  }
}

const Level = styled.span`
  color: ${p => p.theme.colors[COLORS_MAP[p.level]]};
`;

const LevelInput = styled.div`
  position: relative;
  display: flex;
  height: 43px;
  border-radius: ${p => p.theme.general.borderRadius};
  background-color: ${p => rgba(p.theme.colors[COLORS_MAP[p.level]], 0.1)};
  margin-right: 1px;
  &:after {
    content: '';
    position: absolute;
    width: calc(${100 / LEVELS.length}% + 1px);
    height: 100%;
    border-radius: ${p => p.theme.general.borderRadius};
    top: 0;
    // transition: ${p => p.theme.transitions.medium};
    left: ${p => LEVELS.indexOf(p.level) * 20}%;
    will-change: left;
    background: ${p => p.theme.colors[COLORS_MAP[p.level]]};
  }
`;

const LevelButton = styled(p => <Button unstyled {...p} />)`
  position: relative;
  width: ${100 / LEVELS.length}%;
  height: 100%;
  border-radius: ${p => p.theme.general.borderRadius};
  &:hover {
    background-color: ${p => rgba(p.theme.colors[COLORS_MAP[p.level]], 0.1)};
  }
  &:not(:last-of-type) {
    &:after {
      content: '';
      position: absolute;
      right: -1px;
      top: 33.33%;
      height: 33.33%;
      width: 1px;
      background: ${p => rgba(p.theme.colors[COLORS_MAP[p.level]], 0.5)};
    }
  }
`;

export default SkillLevel;
