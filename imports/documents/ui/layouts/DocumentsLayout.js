import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Header from '/imports/documents/ui/components/Header';

class PolicyLayout extends PureComponent {
  render() {
    return (
      <>
      <Header />
      <Main>{this.props.children}</Main>
      </>
    );
  }
}

const Main = styled.main`
  min-height: calc(100vh - ${p => p.theme.general.headerHeight});
  background-color: ${p => p.theme.colors.gray.lighter};
  ${({ theme }) => theme.max('md')`
    margin-top: ${theme.general.headerHeight};
  `}
`;

export default PolicyLayout;
