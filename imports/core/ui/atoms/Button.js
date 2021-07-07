import styled, { css } from 'styled-components';
import { darken } from 'polished';

import { hiddenMixin } from '/imports/core/ui/helpers';
import { linkStyle } from '/imports/core/ui/mixins';

export const Button = styled.button`
  background: ${p => p.theme.colors.primary};
  color: white;
  border: ${p => p.theme.general.borderWidth} solid ${p => p.theme.colors.primary};
  width: ${p => (p.fullWidth ? '100%' : 'auto')};
  font-size: ${p => p.theme.font.size.base};
  font-weight: 500;
  padding: 0.7em 1.7em;
  cursor: pointer;
  will-change: box-shadow;
  border-radius: ${p => p.theme.general.borderRadius};
  // transition: box-shadow ${p => p.theme.transitions.fast};
  &:hover {
    background: ${p => darken(0.1, p.theme.colors.primary)};
    border-color: ${p => darken(0.1, p.theme.colors.primary)};
  }
  &:disabled {
    border-color: ${p => p.theme.colors.gray.light};
    background-color: ${p => p.theme.colors.gray.light};
  }
  ${p => p.huge && css`
    font-size: 15px;
    font-weight: bold;
    padding: 1em 6em;
  `}
  ${p => p.unstyled && css`
    background: transparent;
    border: 0;
    margin: 0;
    color: ${p => p.theme.colors.black};
    border-radius: 0;
    padding: 0;
    &:hover {
      box-shadow: none;
      background: transparent;
    }
  `}
  ${p => p.link && css`
    background: transparent;
    border: 0;
    margin: 0;
    padding: 0;
    ${linkStyle}
    &:hover {
      box-shadow: none;
      background: transparent;
    }
  `}
  ${p => p.default && css`
    background: transparent;
    border: transparent;
    font-weight: normal;
    &:hover {
      box-shadow: none;
      background: transparent;
    }
  `}
  ${p => p.outline && css`
    background: transparent;
    color: ${p => p.theme.colors.black};
    border-color: ${p => p.theme.colors.gray.light};
    &:hover {
      background: transparent;
      color: ${p => p.theme.colors.primary};
      border-color: ${p => p.theme.colors.primary};
    }
  `};
  ${p => p.disabled && css`
    background: ${p => p.theme.colors.gray.light};
    border-color: ${p => p.theme.colors.gray.light};
    &:hover {
      box-shadow: none;
      cursor: not-allowed;
      background: ${p => p.theme.colors.gray.light};
    }
  `}
  ${p => p.black && css`
    background-color: ${p => p.theme.colors.black};
    border-color: ${p => p.theme.colors.black};
    color: white;
  `};
  ${p => p.cta && css`
    background-color: ${p => p.theme.colors.cta};
    border-color: ${p => p.theme.colors.cta};
  `};
  ${hiddenMixin}
`;

export default Button;
