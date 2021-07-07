import React, { PureComponent } from 'react';
import styled from 'styled-components';

import {
  Text as TextAtom,
  NestedItem
} from '/imports/pdf/sydney/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

class EducationItem extends PureComponent {
  render() {
    const {degree, school, endDate, showOnlyYear} = this.props;
    return (
      <NestedItem education>
        <Degree>
          {degree}
        </Degree>
        <School>
          {school}
        </School>
        <Decoration />
        <Date>
          {endDate}
        </Date>
      </NestedItem>
    );
  }
}

const Text = styled(TextAtom)`
  line-height: 20px;
  text-transform: uppercase;
`;

const Degree = styled(Text)`
  font-family: 'Raleway SemiBold';
  color: #000;
`;

const School = styled(Text)`
  font-family: 'Raleway SemiBold';
`;

const Decoration = styled(View)`
  width: 30px;
  height: 1px;
  background: #d3d1d1;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Date = styled(Text)`

`;

export default EducationItem;
