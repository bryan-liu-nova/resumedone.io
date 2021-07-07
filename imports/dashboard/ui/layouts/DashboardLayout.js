import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Header from '/imports/dashboard/ui/components/Header';

class DashboardLayout extends PureComponent {
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
  padding: 0;
  ${({ theme }) => theme.max('md')`
    margin-top: ${theme.general.headerHeight};
  `}
`;

export default DashboardLayout;
