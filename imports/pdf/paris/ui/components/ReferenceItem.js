import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Text, BlockNestedItem, SubHeading, Link as LinkAtom } from '/imports/pdf/paris/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, email, phone, color } = this.props;
    return (
      <BlockNestedItem wrap={false}>
        <SubHeading>{title}</SubHeading>
          <LinksCont>
            {phone && <Text>{phone}</Text>}
            {email && phone && <Spacer>-</Spacer>}
            {email && <Text style={{ textDecoration: 'none' }} ><Link src={`mailto:${email}`} color={color}>{email}</Link></Text>}
          </LinksCont>
      </BlockNestedItem>
    );
  }
}

const LinksCont = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
`;

const Spacer = styled(Text)`
  margin: 0 7pt;
`;

const Link = styled(p => <LinkAtom {...p} />)`
  font-size: 12pt;
`;

export default RangeActivityDisplay;
