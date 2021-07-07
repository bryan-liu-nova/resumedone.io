import styled from 'styled-components';
import { rgba } from 'polished';

import { ValidatedInput } from '/imports/core/ui/atoms';

const OnboardingInput = styled(ValidatedInput)`
  width: 100%;
  padding: 8px 12px;
  border-radius: 3px;
  display: block;
  appearance: none;
  background-color: #ffffff;
  &:focus {
    outline: none;
    box-shadow: 0 0 3px ${({ theme }) => rgba(theme.colors.primary, 0.3)};
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.gray.light};
  }
`;

export default OnboardingInput;
