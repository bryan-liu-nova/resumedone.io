import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Text, BlockNestedItem, Heading, Link } from '/imports/pdf/amsterdam/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, email, phone, color } = this.props;
    return (
      <Container wrap={false}>
        <Heading>{title}</Heading>
          <LinksCont>
            {email && <Text style={{ textDecoration: 'none' }} ><EmailLink src={`mailto:${email}`} color={color}>{email}</EmailLink></Text>}
            {email && phone && <Spacer>|</Spacer>}
            {phone && <PhoneText>{phone}</PhoneText>}
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
  margin: 0 3pt;
`;

const PhoneText = styled(Text)`
  font-size: 8pt;
`;

const EmailLink = styled(p => <Link {...p} />)`
  font-size: 8pt;
`;

const Container = styled(BlockNestedItem)`
  margin-bottom: 11pt;
`;

export default RangeActivityDisplay;
