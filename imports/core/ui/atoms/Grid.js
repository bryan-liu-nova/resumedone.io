import styled, { css } from 'styled-components';

const Grid = styled.section`
  display: grid;
  ${props => props.cols && css`grid-template-columns: ${props.cols};`}
  ${props => props.gap && css`grid-gap: ${props.gap};`}
`;

export default Grid;
