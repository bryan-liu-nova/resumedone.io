import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Text, BlockNestedItem, Heading, Link } from '/imports/pdf/newYork/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, email, phone, color } = this.props;
    return (
      <BlockNestedItem wrap={false}>
        <Heading>{title}</Heading>
          <LinksCont style={{ textDecoration: 'none' }}>
            {email && <Text><Link src={`mailto:${email}`} color={color}>{email}</Link></Text>}
            {email && phone && <Spacer>|</Spacer>}
            {phone && <Text>{phone}</Text>}
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
  margin: 0 3pt;
`;

export default RangeActivityDisplay;
