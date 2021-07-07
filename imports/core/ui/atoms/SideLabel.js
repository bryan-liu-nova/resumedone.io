import styled from 'styled-components';

const SideLabel = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  > label {
    margin-left: 10px;
    > span {
      display: block;
      color: ${p => p.theme.colors.gray.regular};
    }
  }
  ${p => p.theme.max('md')`
    margin-bottom: 30px;
    > label {
      margin-top: 6px;
      font-size: 18px;
      margin-left: 15px;
    }
  `}
`;

export default SideLabel;
