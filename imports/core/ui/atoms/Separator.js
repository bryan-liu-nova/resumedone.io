import styled from 'styled-components';

const Separator = styled.div`
  height: 18px;
  width: 1px;
  margin-left: 30px;
  margin-right: 15px;
  background: ${({ theme }) => theme.colors.gray.light};
  ${p => p.theme.max('sm')`
    display: none;
  `}
`;

export default Separator;
