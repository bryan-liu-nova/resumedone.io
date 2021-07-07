import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Text, BlockNestedItem, Heading, Link } from '/imports/pdf/vancouver/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

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
  margin-top: 2pt;
`;

const Company = styled(Text)`
`;

const Title = styled(Text)`
  font-family: 'SolomonSans SemiBold';
  margin-bottom: 0;
`;

const Container = styled(BlockNestedItem)`
  margin-bottom: 16pt;
`;

export default RangeActivityDisplay;
