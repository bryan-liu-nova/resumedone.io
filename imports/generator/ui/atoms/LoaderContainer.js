import styled from 'styled-components';

const LoaderContainer = styled.p`
  margin: 0;
  padding: 0;
  background: ${p => p.theme.colors.gray.lighter};
  border-radius: ${p => p.theme.general.borderRadius};
  > img {
    width: 100%;
    height: 100%;
  }
`;

export default LoaderContainer;
