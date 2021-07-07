import styled from 'styled-components';

const InputErrorMessage = styled.span.attrs({
  'data-error': 'error'
})`
  position: absolute;
  top: ${p => p.experiment ? '85px' : '48px'};
  font-size: 10px;
  color: ${p => p.theme.colors.danger};
`;

export default InputErrorMessage
