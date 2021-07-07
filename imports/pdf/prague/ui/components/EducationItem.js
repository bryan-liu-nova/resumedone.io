import React, { PureComponent } from 'react';
import styled from 'styled-components';

import {
  Text as TextAtom
} from '/imports/pdf/prague/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

class EducationItem extends PureComponent {
  render() {
    const {degree, school, endDate, showOnlyYear} = this.props;
    return (
      <NestedItem>
        <Degree>
          {degree}
        </Degree>
        <School>
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
  text-transform: uppercase;
`;

const School = styled(Text)`
`;

const Date = styled(Text)`
`;

const NestedItem = styled(View)`
  margin-bottom: 15px;
`;

export default EducationItem;
