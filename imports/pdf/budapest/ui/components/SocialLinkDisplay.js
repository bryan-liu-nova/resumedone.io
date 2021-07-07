import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom, Link as LinkAtom } from '/imports/pdf/budapest/ui/atoms';
import { theme } from '/imports/core/ui/theme';

class SocialLinkDisplay extends PureComponent {
  render() {
    const { title, color, src } = this.props;
    return (
      <Container>
        <Text>{title}:</Text>
        <Link color={color} src={src}>{src}</Link>
      </Container>
    );
  }
}

export const Text = styled(TextAtom)`
  color: #e6e6e7;
`;

const Link = styled(LinkAtom)`
  color: #e6e6e7;
`;

export const Container = styled(View)`
  margin-bottom: 12px;
`;

export default SocialLinkDisplay;
