import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { AccountSocialIcon, LineButton } from '/imports/dashboard/ui/atoms';

class AccountSocialList extends PureComponent {
  render() {
    return (
      <>
        {
          this.props.socials.map(social => (
            <SocialProfileItem key={social.name}>
              <SocialProfileTextWithIcon>
                <AccountSocialIcon {...social} />
                {social.name}
              </SocialProfileTextWithIcon>
              <LineButton>Connect</LineButton>
            </SocialProfileItem>
          ))
        }
      </>
    );
  }
}

const SocialProfileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
  &:last-child {
    margin-bottom: 0;
    border: none;
    padding-bottom: 0;
  }
`;

const SocialProfileTextWithIcon = styled.div`
  display: flex;
  align-items: center;
`;

export default AccountSocialList;