import { css } from 'styled-components';
import { darken } from 'polished';

export const inputStyle = css`
  position: relative;
  display: block;
  border: 0;
  background-color: ${p => p.theme.colors.gray.lighter};
  padding: 11px 16px;
  line-height: 24px;
  width: 100%;
  overflow: hidden;
  font-size: 19px;
  border-radius: ${p => p.theme.general.borderRadius};
  color: ${p => p.theme.colors.black};
  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: ${p => p.theme.colors.gray.regular};
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: ${p => p.theme.colors.gray.regular};
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: ${p => p.theme.colors.gray.regular};
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: ${p => p.theme.colors.gray.regular};
  }
`;

export const linkStyle = css`
  color: ${p => p.theme.colors.primary};
  font-weight: 300;
  &:hover {
    color: ${p => darken(0.2, p.theme.colors.primary)};
    text-decoration: none;
  }
`;
