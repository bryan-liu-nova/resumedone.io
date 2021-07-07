import React, { PureComponent } from 'react';
import styled from 'styled-components';

import {
  Text as TextAtom
} from '/imports/pdf/riga/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

class EducationItem extends PureComponent {
  render() {
    const {degree, school, endDate, showOnlyYear, color} = this.props;
    return (
      <NestedItem>
        <Degree>
          {degree}
        </Degree>
        <School color={color}>
          {school}
        </School>
        <Date>
          {endDate}
        </Date>
      </NestedItem>
    );
  }
}

const Text = styled(TextAtom)`
  line-height: 1.3;
`;

const Degree = styled(Text)`
  color: #333e50;
  font-size: 15px;
  font-family: 'CrimsonText SemiBold';
`;

const School = styled(Text)`
  font-size: 13.2px;
  font-family: 'CrimsonText Italic';
  margin-top: 2px;
`;

const Date = styled(Text)`
  margin-top: 6px;
`;

const NestedItem = styled(View)`
  margin-bottom: 15px;
`;

export default EducationItem;
