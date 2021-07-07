import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';

import { Flex, Box, Icon, Button } from '/imports/core/ui/atoms';
import LogoAtom from '/imports/core/ui/components/Logo';
import { withAccount } from '/imports/core/api/accounts/accountContext';
import history from '/imports/core/api/history';
import { CURRENT_USER } from '/imports/core/api/apollo/client/queries';
import { DELETE_ACCOUNT } from '/imports/dashboard/api/apollo/client/mutations';
import client from '/imports/core/api/apollo/client/init';

@withAccount
@graphql(DELETE_ACCOUNT)
class OnboardingHeader extends PureComponent {
  close = () => {
    const { currentUser } = this.props;
    if (!currentUser) {
      history.push('/');
    } else {
      this.props.mutate().then(() => {
        client.query({ query: CURRENT_USER }).then(() => {
          history.push('/');
        });
      });
    }
  };

  render() {
    return (
      <HeaderContainer>
        <Box>
          <Logo noLink />
        </Box>
        <Box>
          {/*<HeaderClose onClick={this.close}>*/}
            {/*<Icon icon="x" />*/}
          {/*</HeaderClose>*/}
        </Box>
      </HeaderContainer>
    );
  }
}

const Logo = styled(LogoAtom)`
  ${p => p.theme.max('sm')`
    font-size: 13px;
  `}
`;

const HeaderContainer = styled(p =>
  <Flex {...p} justifyContent="space-between" alignItems={'center'}/>)`
  padding: 0 24px;
  position: fixed;
  height: 80px;
  background-color: transparent;
  & {
    width: 100%;
  }
  ${({theme}) => theme.max('md')`
    height: 64px;
  `}
`;

const HeaderClose = styled(p => <Button link {...p} />)`
 font-size: 1.8rem;
 color: ${({ theme }) => theme.colors.primary};
 text-decoration: none;
 ${({theme}) => theme.max('md')`
  font-size:24px
 `}
`;

export default OnboardingHeader;
