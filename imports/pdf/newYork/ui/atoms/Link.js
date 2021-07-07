import { Link as LinkAtom } from '/imports/pdf/core/ui/atoms';
import styled, { css } from 'styled-components';
import { theme } from '/imports/core/ui/theme';

const Link = styled(LinkAtom)`
  color: ${p => theme.colors[p.color]};
  font-size: 10pt;
  line-height: 1.45;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default Link;
