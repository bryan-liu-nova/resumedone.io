import styled, { css } from 'styled-components';

const List = styled.ul`
  ${p => p.horizontal && css`
    display: flex;
    flex-wrap: wrap;
  `}
  ${p => p.unstyled && css`
    margin: 0;
    padding: 0;
    list-style: none;
  `};
  ${props => props.centered && css`justify-content: center;`}
`;

export default List;
