import React from 'react';
import styled from 'styled-components'
import { Button } from '/imports/core/ui/atoms';
import { lighten } from 'polished';

const AddBlockButton = styled(p => <Button fullWidth unstyled {...p} />)`
  font-weight: 400;
  padding: 15px 3px;
  text-align: left;
  background: white;
  border-top: 1px dashed ${p => p.theme.colors.gray.light};
  border-bottom: 1px dashed ${p => p.theme.colors.gray.light};
  color: ${p => p.theme.colors.primary};
  display: flex;
  align-items: center;
  ${({ theme }) => theme.min('md')`
    &:hover {
      background-color: ${p => lighten(0.52, p.theme.colors.primary)};
      border-top: 1px solid ${p => lighten(0.52, p.theme.colors.primary)};
      border-bottom: 1px solid ${p => lighten(0.52, p.theme.colors.primary)};
    }
  `}
`;

export default AddBlockButton;
