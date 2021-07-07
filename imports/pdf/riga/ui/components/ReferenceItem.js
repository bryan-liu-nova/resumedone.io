import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/riga/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, email, phone, company, color } = this.props;
    return (
      <Container>
        <Title>{title}</Title>
        {company && <Company color={color}>{company}</Company>}
        <LinksCont>
          {phone && <RefLink>Phone: {phone}</RefLink>}
          {email && <RefLink>Email: {email}</RefLink>}
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
  font-size: 13.2px;
  font-family: 'CrimsonText Italic';
`;

const Title = styled(Text)`
  color: #333e50;
  font-size: 15px;
  font-family: 'CrimsonText SemiBold';
`;

const RefLink = styled(Text)`
  line-height: 1.3;
`;

const Container = styled(View)`
  
`;

export default RangeActivityDisplay;
