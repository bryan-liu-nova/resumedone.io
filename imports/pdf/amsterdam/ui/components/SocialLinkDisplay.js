import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { View, Link as LinkAtom } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/amsterdam/ui/atoms';
import { theme } from '/imports/core/ui/theme';

class SocialLinkDisplay extends PureComponent {
  render() {
    const { title, color, src } = this.props;
    return (
      <Cont>
        <Link color={color} src={src}>{title}</Link>
      </Cont>
    );
  }
}

export const Text = styled(TextAtom)`
  font-weight: 400;
`;

const Cont = styled(View)`
  margin: 3pt 0 6pt;
`;

const Link = styled(LinkAtom)`
  font-family: 'Montserrat';
  color: ${p => theme.colors[p.color]};
  font-size: 8pt;
`;

export default SocialLinkDisplay;
