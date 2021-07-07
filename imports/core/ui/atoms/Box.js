import styled, { css } from 'styled-components';
import { flexChildMixin, buildResponsiveWidthMixin, hiddenMixin } from '/imports/core/ui/helpers';

const getAlignment = align => {
  if (align === 'center') {
    return 'center';
  } else if (align === 'right' || align === 'bottom') {
    return 'flex-end';
  }
  return 'flex-start';
};

const Box = styled.div`
  display: block;
  ${p => p.width && css`width: ${p.width};`}
  ${flexChildMixin}
  ${buildResponsiveWidthMixin}
  ${p => p.padded && css`
    padding-left: ${p.theme.general.gridGap};
    padding-right: ${p.theme.general.gridGap};
  `}
  ${p => p.exact && css`
    flex-grow: 0;
    flex-shrink: 0;
  `}
  ${p => (p.alignX || p.alignY) && css`
    display:flex;
    flex-direction: column;
    align-items: ${getAlignment(p.alignX)};
    justify-content: ${getAlignment(p.alignY)};
  `}
  ${hiddenMixin}
`;

export default Box;
