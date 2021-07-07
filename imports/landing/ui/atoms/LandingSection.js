import styled from 'styled-components';

import { Container } from '/imports/core/ui/atoms';

const LandingSection = styled(Container)`
  position: relative;
  z-index: 2;
  height: auto;
  padding: 0 3.5rem;
  ${({ theme }) => theme.max('xs')`
    padding: 0 1rem;
  `}
`;

export default LandingSection;
