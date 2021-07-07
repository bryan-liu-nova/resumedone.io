import styled from 'styled-components';

import { hiddenMixin } from '/imports/core/ui/helpers';

const Hr = styled.hr`
  background-color: ${p => p.theme.colors.black};
  border: 0;
  width: 100%;
  height: 1px;
  ${p => p.grayed && `background-color: ${p.theme.colors.gray.light};`};
  ${hiddenMixin}
`;

export default Hr;
