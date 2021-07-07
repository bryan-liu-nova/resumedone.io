import styled, { css } from 'styled-components';
import { colorMixin, flexChildMixin, hiddenMixin } from '/imports/core/ui/helpers';

const Text = styled.p`
  font-weight: normal;
  font-size: ${p => p.theme.font.size.base};
  ${props =>
    props.small
      ? css`
          font-size: ${p => p.theme.font.size.small};
        `
      : ''}
  ${props =>
    props.align
      ? css`
          text-align: ${props.align};
        `
      : ''}
  ${props =>
    props.smaller
      ? css`
          font-size: ${p => p.theme.font.size.smaller};
        `
      : ''}
  ${props =>
    props.noMargin
      ? css`
          margin: 0;
        `
      : ''}
  ${props =>
    props.bold
      ? css`
          font-weight: bold;
        `
      : ''}
  ${props =>
    props.italic
      ? css`
          font-style: italic;
        `
      : ''}
  ${props =>
    props.weight
      ? css`
          font-weight: ${props.weight};
        `
      : ''}
  ${props =>
    props.huge
      ? css`
          font-size: ${p => p.theme.font.size.h5};
        `
      : ''}
  ${props =>
    props.transform
      ? css`
          text-transform: ${props.transform};
        `
      : ''}
  ${props =>
    props.spaced
      ? css`
          letter-spacing: ${p => p.theme.font.letterSpacing.accent};
        `
      : ''}
  ${colorMixin}
  ${flexChildMixin}
  ${hiddenMixin}
`;

export default Text;
