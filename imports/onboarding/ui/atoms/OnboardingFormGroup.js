import styled from 'styled-components';
import { FormGroup } from '/imports/core/ui/atoms';

const OnboardingFormGroup = styled(FormGroup)`
  margin-bottom: 24px;
  padding: 0;
  flex: 1 1;
  > label { 
    margin-bottom: 2px;
  }
`;

export default OnboardingFormGroup;
