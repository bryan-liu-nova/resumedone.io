import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { View, Link as LinkAtom } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/singapore/ui/atoms';

class SocialLinkDisplay extends PureComponent {
  render() {
    const { title, src } = this.props;
    return (
      <Link src={src}>{title}</Link>
    );
  }
}

export const Text = styled(TextAtom)`
  font-weight: 400;
`;

const Link = styled(LinkAtom)`
  display: inline-block;
  font-size: 10pt;
`;

export const Container = styled(View)`
  display: inline-block;
`;

export default SocialLinkDisplay;
