import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Text, BlockNestedItem } from '/imports/pdf/singapore/ui/atoms';
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
          {email && <GreyText>{email}</GreyText>}
          {phone && <GreyText>{phone}</GreyText>}
        </LinksCont>
      </Container>
    );
  }
}

const LinksCont = styled(View)`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
`;

const Company = styled(Text)`
  margin-bottom: 4pt;
`;

const Title = styled(Text)`
  font-family: 'HelveticaNeue Bold';
`;

const GreyText = styled(Text)`
  color: ${p => theme.colors.gray.regular};
`;

const Container = styled(BlockNestedItem)`
  margin-bottom: 10pt;
`;

export default RangeActivityDisplay;
