import React from 'react';
import styled, { css } from 'styled-components';

import { SvgIcon } from '/imports/core/ui/atoms';

const Container = styled.div`
  position: absolute;
  top: ${p => p.experiment ? '36px' : '12px'};
  right: 0;
  z-index: 100;
  ${p => p.hide && css`
    opacity: 0;
  `}
`;

const Icon = styled(p => <SvgIcon.Check {...p} />)`
  font-size: 14px;
  margin-right: 4px;
  color: ${p => p.theme.colors.secondary};
  width: 20px;
`;

const ErrorIcon = styled(p => <SvgIcon.Alert {...p} />)`
  font-size: 14px;
  margin-top: 2px;
  color: ${p => p.theme.colors.danger};
`;

export default ({ error, empty, hide, experiment }) => (
  <Container hide={hide} experiment={experiment}>
    {error ? <ErrorIcon /> : (!empty && <Icon />)}
  </Container>
);
