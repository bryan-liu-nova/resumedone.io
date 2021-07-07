import { keyframes } from 'styled-components';

export const spin = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`;

export const unspin = keyframes`
  from {
    transform: rotate(360deg)
  }
  to {
    transform: rotate(0deg)
  }
`;
