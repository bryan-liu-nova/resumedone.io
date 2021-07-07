import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LandingButton = styled.a`
  text-decoration: none;
  display: inline-block;
  text-align: center;
  // transition: border .5s;
  border: 0;
  background: ${({ theme }) => theme.colors.darkOrange};
  color: #FFFFFF;
  font-size: 1.3125rem;
  line-height: 3.6875rem;
  font-family: ${({ theme }) => theme.font.family.accent};
  font-weight: 700;
  border-radius: 6px;
  height: 3.6rem;
  width: 14.2rem;
  z-index: 30;
  margin: 1.5rem 0 .7rem;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.orange};
}
  ${({ theme }) => theme.max('xs')`
    height: 3.3125rem;
    width: 13.75rem;
  `}
`;

export default LandingButton;
