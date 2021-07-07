import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/chicago/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, email, phone, company } = this.props;
    return (
      <Container>
        <Title>{title}</Title>
        {company && <Company>{company}</Company>}
        <LinksCont>
          {phone && <RefLink><span>T: </span>{phone}</RefLink>}
          {email && <RefLink><span>E: </span>{email}</RefLink>}
        </LinksCont>
      </Container>
    );
  }
}

const Text = styled(TextAtom)`
`;

const LinksCont = styled(View)`
  margin-top: 4px;
`;

const Company = styled(Text)`
`;

const Title = styled(Text)`
  font-family: 'Raleway SemiBold';
  color: #000;
`;

const RefLink = styled(Text)`
  span {
    font-family: 'Raleway SemiBold';
    color: #000;
  }
`;

const Container = styled(View)`
  margin-bottom: 16px;
`;

export default RangeActivityDisplay;
