import styled from 'styled-components';
import { Link } from 'react-router-dom';

const RouterLink = styled(Link)`
  color: ${p => p.theme.colors.black};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default RouterLink;
