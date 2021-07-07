import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Text, BlockNestedItem, Heading, Link } from '/imports/pdf/moscow/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';
import { theme } from '/imports/core/ui/theme';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, email, phone, company } = this.props;
    return (
      <Container wrap={false}>
        <Title>{title}</Title>
        {company ? <Company>{company}</Company> : null}
          <LinksCont>
            {email && <Text>{email}</Text>}
            {phone && <Text>{phone}</Text>}
          </LinksCont>
      </Container>
    );
  }
}

const LinksCont = styled(View)`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10pt;
`;

const Company = styled(Text)`
  margin-top: 7pt;
  line-height: 1;
  color: ${theme.colors.gray.regular};
`;

const Title = styled(Text)`
  font-family: 'SolomonSans SemiBold';
  line-height: 1;
`;

const Container = styled(BlockNestedItem)`
  margin-bottom: 25pt;
`;

export default RangeActivityDisplay;
