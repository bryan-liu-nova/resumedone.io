import { Link as LinkAtom } from '/imports/pdf/core/ui/atoms';
import styled from 'styled-components';
import { theme } from '/imports/core/ui/theme';

const Link = styled(LinkAtom)`
  font-family: 'CrimsonText';
  color: ${p => theme.colors[p.color]};
  font-size: 10pt;
  line-height: 1.45;
`;

export default Link;
