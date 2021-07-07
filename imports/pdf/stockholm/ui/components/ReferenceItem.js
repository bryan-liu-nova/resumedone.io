import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import {
  Text as TextAtom,
  BlockNestedItem as BNIAtom,
  Heading as HeadingAtom,
  Link as LinkAtom
} from '/imports/pdf/stockholm/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, email, phone, color } = this.props;
    return (
      <BlockNestedItem wrap={false}>
        <Heading>{title}</Heading>
          <LinksCont style={{ textDecoration: 'none' }}>
            {email && <Link src={`mailto:${email}`} color={color}>{email}</Link>}
            {email && phone && <Spacer>|</Spacer>}
            {phone && <Text>{phone}</Text>}
          </LinksCont>
      </BlockNestedItem>
    );
  }
}

const LinksCont = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 3pt;
`;

const Spacer = styled(TextAtom)`
  margin: 0 5pt;
  color: #566d77;
`;

const Link = styled(p => <LinkAtom {...p} />)`
  font-size: 9pt;
`;

const Heading = styled(HeadingAtom)`
  font-size: 11.25pt;
`;

const Text = styled(TextAtom)`
  font-size: 9pt;
  color: #566d77;
`;

const BlockNestedItem = styled(BNIAtom)`
  margin-bottom: 4pt;
`;

export default RangeActivityDisplay;
