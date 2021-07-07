import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { parseDraftText } from '/imports/pdf/core/api/helpers';

import {
  Text,
  SubHeading,
  BlockNestedItem,
} from '/imports/pdf/riga/ui/atoms';
import DateRangeDisplay from './DateRangeDisplay';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, employer, startDate, endDate, current, description, showOnlyYear, color, blockType } = this.props;
    return (
      <BlockNestedItem courses={blockType === 'COURSES'}>
        <SubHeading>{title}</SubHeading>
        <Subtitle>
          {employer && (
            <Employer color={color}>{employer}</Employer>
          )}
          <DateRangeDisplay
            startDate={startDate}
            endDate={endDate}
            current={current}
            showOnlyYear={showOnlyYear}
            employer={employer}
            color={color}
          />
        </Subtitle>
        <TextCont>
          {
            (!description || description === null || description === '') ?
              <Text>{description}</Text>
              : parseDraftText(description, Text, 'riga')
          }
        </TextCont>
      </BlockNestedItem>
    );
  }
}

const TextCont = styled(View)`
`;

const Subtitle = styled(Text)`
  display: flex;
  flex-direction: row;
`;

const Employer = styled(Text)`
  font-size: 13.2px;
  font-family: 'CrimsonText Italic';
`;

export default RangeActivityDisplay;