import styled from 'styled-components';

import { Label } from '/imports/core/ui/atoms';

const OnboardingLabel = styled(Label)`
  text-align: left;
  line-height: 1.8;
  min-height: 1.8em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray.dark};
  font-weight: 500;
  font-size: ${({ theme }) => theme.font.size.small};
`;

export default OnboardingLabel;
