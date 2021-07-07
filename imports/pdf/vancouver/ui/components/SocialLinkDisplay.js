import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { View, Link as LinkAtom } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/vancouver/ui/atoms';
import { theme } from '/imports/core/ui/theme';

class SocialLinkDisplay extends PureComponent {
  render() {
    const { title, color, src } = this.props;
    return (
      <Link color={color} src={src}>{title}</Link>
    );
  }
}

export const Text = styled(TextAtom)`
  font-weight: 400;
`;

const Link = styled(LinkAtom)`
  display: inline-block;
  color: ${p => theme.colors[p.color]};
  font-size: 10pt;
`;

export const Container = styled(View)`
  display: inline-block;
`;

export default SocialLinkDisplay;
