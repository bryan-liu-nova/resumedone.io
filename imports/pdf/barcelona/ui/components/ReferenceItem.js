import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Text, BlockNestedItem, Link } from '/imports/pdf/barcelona/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';
import { theme } from '/imports/core/ui/theme';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, email, phone, color, company } = this.props;
    return (
      <BlockNestedItem wrap={false}>
        {
          company &&
            <Company color={color} >
              {company}
            </Company>
        }
        <Title>{title}</Title>
        <LinksCont>
          {email && <Text>{email}</Text>}
          {phone && <Text>{phone}</Text>}
        </LinksCont>
      </BlockNestedItem>
    );
  }
}

const LinksCont = styled(View)`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled(Text)`
  font-family: 'PtSerif';
  font-size: 10.6pt;
  padding-top: 3pt;
  margin-bottom: 4pt;
`;

const Company = styled(Text)`
  color: ${p => theme.colors[p.color]};
`;

export default RangeActivityDisplay;
