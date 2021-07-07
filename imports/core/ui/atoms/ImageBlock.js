import styled from 'styled-components';

const ImageBlock = styled.div`
  width: ${props => props.width || '50px'};
  height: ${props => props.height || '50px'};
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export default ImageBlock;
