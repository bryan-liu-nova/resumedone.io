import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom, Link as LinkAtom } from '/imports/pdf/chicago/ui/atoms';

class SocialLinkDisplay extends PureComponent {
  render() {
    const { title, color, src } = this.props;
    return (
      <Container>
        <Text>{title}:</Text>
        <Link src={src}>{src}</Link>
      </Container>
    );
  }
}

export const Text = styled(TextAtom)`
  color: #000;
`;

const Link = styled(LinkAtom)`
  color: #000;
`;

export const Container = styled(View)`
  margin-bottom: 12px;
`;

export default SocialLinkDisplay;
