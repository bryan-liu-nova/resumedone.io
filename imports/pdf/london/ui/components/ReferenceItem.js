import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Text, BlockNestedItem, Heading as HeadingAtom, Link } from '/imports/pdf/london/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, email, phone, color } = this.props;
    return (
      <Container wrap={false}>
        <Heading>{title}</Heading>
          <LinksCont style={{ textDecoration: 'none' }}>
            {email && <Text><Link src={`mailto:${email}`} color={color}>{email}</Link></Text>}
            {email && phone && <Spacer>·</Spacer>}
            {phone && <Text>{phone}</Text>}
          </LinksCont>
      </Container>
    );
  }
}

const LinksCont = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
`;

const Spacer = styled(Text)`
  margin: 0 2pt;
`;

const Heading = styled(HeadingAtom)`
  font-size: 9.8pt;
  text-transform: capitalize;
  margin-bottom: 4pt;
  letter-spacing: 0;
`;

const Container = styled(BlockNestedItem)`
  margin-bottom: 10pt;
`;

export default RangeActivityDisplay;
