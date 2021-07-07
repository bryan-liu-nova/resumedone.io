import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Text, BlockNestedItem, HeadingSmall } from '/imports/pdf/berlin/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, email, phone, company } = this.props;
    return (
      <Container wrap={false}>
        <HeadingCont>{title}</HeadingCont>
        { company && <Text>{company}</Text> }
        <LinksCont>
          {email && <LinkText>{email}</LinkText>}
          {phone && <LinkText>{phone}</LinkText>}
        </LinksCont>
      </Container>
    );
  }
}

const LinksCont = styled(View)`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 6pt;
`;

const HeadingCont = styled(HeadingSmall)`
  font-family: 'Montserrat Bold';
  font-size: 9.6pt;
  margin-bottom: 3pt;
`;

const LinkText = styled(Text)`
  font-size: 10pt;
`;

const Container = styled(BlockNestedItem)`
  margin-bottom: 24pt;
`;

export default RangeActivityDisplay;
