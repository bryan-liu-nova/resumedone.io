import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Text, BlockNestedItem, HeadingSmall, Link } from '/imports/pdf/milan/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, email, phone, color, company } = this.props;
    return (
      <Container wrap={false}>
        <Title>{title}</Title>
        {company &&
            <Text>{company}</Text>}
        <LinksCont style={{ textDecoration: 'none' }}>
          {email && <Text><Link src={`mailto:${email}`} color={color}>{email}</Link></Text>}
          {phone && <Text>{phone}</Text>}
        </LinksCont>
      </Container>
    );
  }
}

const LinksCont = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 5pt;
`;

const Title = styled(HeadingSmall)`
  font-size: 9pt;
`;

const Container = styled(BlockNestedItem)`
  margin-bottom: 12pt;
`;

export default RangeActivityDisplay;
