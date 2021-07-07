import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { View, Link as LinkAtom } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/paris/ui/atoms';
import { theme } from '/imports/core/ui/theme';

class SocialLinkDisplay extends PureComponent {
  render() {
    const { title, color, src } = this.props;
    return (
      <Cont style={{ textDecoration: 'none' }}>
        <Link color={color} src={src}>{title}</Link>
      </Cont>
    );
  }
}

export const Text = styled(TextAtom)`
  font-weight: 400;
`;

const Cont = styled(View)`
  margin-top: 6pt;
  margin-bottom: 5pt;
`;

const Link = styled(LinkAtom)`
  color: ${p => theme.colors[p.color]};
  font-size: 10pt;
  text-decoration: none;
`;

export default SocialLinkDisplay;
