import { Link as LinkAtom } from '/imports/pdf/core/ui/atoms';
import styled from 'styled-components';
import { theme } from '/imports/core/ui/theme';

const Link = styled(LinkAtom)`
  font-family: 'SolomonSans SemiBold';
  color: #3d3d3d;
  font-size: 9pt;
  line-height: 1.15;
  text-decoration: underline;
`;

export default Link;
