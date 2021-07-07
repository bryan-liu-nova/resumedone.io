import { Link as LinkAtom } from '/imports/pdf/core/ui/atoms';
import styled from 'styled-components';
import { theme } from '/imports/core/ui/theme';

const Link = styled(LinkAtom)`
  font-family: 'Roboto';
  color: ${p => theme.colors[p.color]};
  font-size: 9pt;
  line-height: 1.2;
`;

export default Link;
