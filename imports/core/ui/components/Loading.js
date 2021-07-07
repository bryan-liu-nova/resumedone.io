import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Cover } from '/imports/core/ui/atoms';

class Loading extends PureComponent {
  render() {
    return (
      <LoadingCont>
        <Spinner>
          <img src="/img/loader.gif" alt="loader" />
        </Spinner>
      </LoadingCont>
    );
  }
}

const LoadingCont = styled(Cover)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.p`
  margin: 0;
  padding: 0;
  color: ${props => props.theme.colors.primary};
  > img {
    width: 70px;
    height: 70px;
  }
`;

export default Loading;
