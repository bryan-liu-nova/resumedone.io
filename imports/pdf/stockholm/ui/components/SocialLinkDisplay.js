import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { View, Link as LinkAtom } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/stockholm/ui/atoms';
import { theme } from '/imports/core/ui/theme';

class SocialLinkDisplay extends PureComponent {
  render() {
    const { title, color, src } = this.props;
    return (
      <Cont style={{ textDecoration: 'none' }}>
        <Text>{title}</Text>
        <Link color={color} src={src}>{src}</Link>
      </Cont>
    );
  }
}

export const Text = styled(TextAtom)`
  font-size: 9.75pt;
  color: #2c2c2c;
`;

const Cont = styled(View)`
  margin: 3pt 0 2pt;
`;

const Link = styled(LinkAtom)`
  color: ${p => theme.colors[p.color]};
  font-size: 9.75pt;
`;

export default SocialLinkDisplay;
