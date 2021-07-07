import styled, { css } from 'styled-components';

const InputStripe = styled.div`
  position: absolute;
  height: 2px;
  bottom: 0;
  background-color: ${p => p.theme.colors.primary};
  left: 0;
  width: 100%;
  visibility: hidden;
  transform: rotateY(90deg);
  // transition: all .3s ease;
  will-change: transform;
  ${p => p.error && css`
    background-color: ${p => p.theme.colors.danger};
    visibility: visible;
    transform: rotateY(0);
  `}
  ${p => p.focus && css`
    visibility: visible;
    transform: rotateY(0);
    background-color: ${p => p.theme.colors.primary};
  `}
`;

export default InputStripe;
