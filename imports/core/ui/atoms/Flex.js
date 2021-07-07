import styled, { css } from 'styled-components';
import { buildResponsiveWidthMixin, flexChildMixin, hiddenMixin } from '/imports/core/ui/helpers';

const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.alignItems || 'flex-start'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
  ${p =>
    p.grid &&
    css`
      flex-wrap: wrap;
      margin-left: -${p.theme.general.gridGap};
      margin-right: -${p.theme.general.gridGap};
      > div {
        flex-grow: 0;
        flex-shrink: 0;
      }
    `}
  ${hiddenMixin}
  ${flexChildMixin}
  ${buildResponsiveWidthMixin}
`;

export default Flex;
