import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Text as TextAtom, DetailsIcon } from '/imports/pdf/prague/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, email, phone, company } = this.props;
    return (
      <Container>
        <DetailsIcon code="e918" references />
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
  text-align: center;
`;

const LinksCont = styled(View)`
`;

const Company = styled(Text)`
  font-size: 12px;
  line-height: 1.4;
`;

const Title = styled(Text)`
  font-size: 11px;
  font-family: Lato SemiBold;
  margin-bottom: 4px;
  letter-spacing: 2px;
`;

const RefLink = styled(Text)`
  font-size: 12px;
  line-height: 1.4;
`;

const Container = styled(View)`
  align-items: center;
`;

export default RangeActivityDisplay;
