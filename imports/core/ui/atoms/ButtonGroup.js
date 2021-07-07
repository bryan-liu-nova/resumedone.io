import styled from 'styled-components';


const ButtonGroup = styled.div`
  display: inline-flex;
  vertical-align: middle;
  width: 100%;
  button, a {
    flex: 1 1 auto;
    border-radius: 0;
    &:first-child {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    &:last-child {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
  }
`;

export default ButtonGroup;
