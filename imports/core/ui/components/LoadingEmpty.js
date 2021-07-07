import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Cover } from '/imports/core/ui/atoms';

class Loading extends PureComponent {
  render() {
    return (
      <LoadingCont>
      </LoadingCont>
    );
  }
}

const LoadingCont = styled(Cover)`
`;

export default Loading;
