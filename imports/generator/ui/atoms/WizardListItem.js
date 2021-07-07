import React from 'react';
import styled from 'styled-components';

import { Flex, SvgIcon } from '/imports/core/ui/atoms';

const ListItem = styled.p`
  font-family: ${p => p.theme.font.accent};
  font-size: 16px;
  margin: 0;
`;

const Icon = styled(p => <SvgIcon.Check {...p} />)`
  font-size: 14px;
  margin-top: 2px;
  margin-right: 5px;
  fill: ${p => p.theme.colors.secondary};
`;

const Container = styled(Flex)`
  margin-bottom: 15px;
`;

export default ({ children }) => (
  <Container>
    <Icon />
    <ListItem>{children}</ListItem>
  </Container>
);