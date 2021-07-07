import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { graphql } from 'react-apollo';

import {
  Container,
  Heading,
  Text,
  Image,
} from '/imports/core/ui/atoms/index';
import { LineButton, TextContainer, DashboardHeading } from '/imports/dashboard/ui/atoms';
import AccountSocialList from '/imports/dashboard/ui/components/AccountSocialList';
import AccountSettingsForm from '/imports/dashboard/ui/components/AccountSettingsForm';
import { USER_INFO } from '/imports/dashboard/api/apollo/client/queries';
import { DELETE_ACCOUNT } from '/imports/dashboard/api/apollo/client/mutations';
import { withConfirm } from '/imports/core/api/confirm';
import client from '/imports/core/api/apollo/client/init';
import history from '/imports/core/api/history';
import { withAccount } from '/imports/core/api/accounts/accountContext';
import { Analytics } from '/imports/core/api/analytics';
import { SUPPORT_EMAIL } from '/imports/core/api/constants';

const socialProfiles = [
  {
    name: 'Facebook',
    icon: '/img/account/icon_facebook.svg',
  },
  {
    name: 'LinkedIn',
    icon: '/img/account/icon_linkedin.svg',
  },
  // {
  //   name: 'Google+',
  //   icon: '/img/account/icon_google.svg',
  // },
];

@withAccount
@withConfirm
@graphql(DELETE_ACCOUNT, { name: 'deleteAccount' })
class SettingsPage extends PureComponent {
  componentDidMount() {
    Analytics.track('account_settings_view');
  }

  goPayment = () => history.push('/checkout');

  deleteAccount = () => {
    const { confirm, deleteAccount } = this.props;
    Analytics.track('delete_account_pop_up');
    confirm({
      title: 'Are You Sure You Want To Delete Your Account?',
      text: 'Once you click delete, your account and associated data will be permanently deleted and cannot be restored. Alternatively if you keep your free account, the next time you want to edit or update your resume you won\'t have to start from scratch.\n',
      cancelText: 'Keep my free account',
      confirmText: 'Delete',
      onConfirm() {
        deleteAccount({
          update: () => {
            Analytics.track('account_deleted');
            client.resetStore();
            history.push('/');
          }
        });
      }
    });
  };

  render() {
    const { currentUser: { serviceData: { subscriptionId } } } = this.props;
    return (
      <Section>
        <ContainerCont>
          <SettingsHeading>Account Settings</SettingsHeading>
          <TitledSection>
            <SettingsText>Subscription</SettingsText>
            <SettingsSection subscription>
              {subscriptionId ? (
                <SettingsSectionInner>
                  <TextWithIconContainer>
                    <FreeIcon src={'/img/account/account_free.svg'}/>
                    <TextContainer>
                      <h4>Premium Account</h4>
                      <p>You are on the premium plan. You can export your resumes as PDF at any quantities</p>
                    </TextContainer>
                  </TextWithIconContainer>
                </SettingsSectionInner>
              ) : (
                <SettingsSectionInner>
                  <TextWithIconContainer>
                    <FreeIcon src={'/img/account/account_free.svg'}/>
                    <TextContainer>
                      <h4>Free Account</h4>
                      <p>You are on the free plan. You can save your data and search for jobs. Upgrade
                        for PDF downloads & premium features.</p>
                    </TextContainer>
                  </TextWithIconContainer>
                  <LineButtonShift onClick={this.goPayment}>Upgrade</LineButtonShift>
                </SettingsSectionInner>
              )}
            </SettingsSection>
          </TitledSection>
          <TitledSection>
            <SettingsText>Account</SettingsText>
            <SettingsSection>
              <AccountSettingsForm />
            </SettingsSection>
          </TitledSection>
          <TitledSection>
            <SettingsText>Social profile</SettingsText>
            <SettingsSection>
              <AccountSocialList socials={socialProfiles}/>
            </SettingsSection>
          </TitledSection>
          <TitledSection>
            <SettingsText>Danger zone</SettingsText>
            <SettingsSection>
              <SettingsSectionInner>
                <TextContainer>
                  <p>Once you delete your account, it cannot be undone. This is permanent.</p>
                </TextContainer>
                <LineButton onClick={this.deleteAccount} danger>Delete Account</LineButton>
              </SettingsSectionInner>
            </SettingsSection>
            <TextContainerBottom>
              <p>Need help? Have questions or feedback? Our team would love to hear from you —
                <a href={`mailto:${SUPPORT_EMAIL}`}> contact our support</a>
              </p>
            </TextContainerBottom>
          </TitledSection>
        </ContainerCont>
      </Section>
    );
  }
}

const Section = styled.section`
  padding: 60px 32px 80px;
  ${({ theme }) => theme.max('sm')`
    padding: 40px 0px 48px;
  `}
`;
const ContainerCont = styled(p => <Container {...p} />)`
  max-width: 736px;
`;

const SettingsSection = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: ${({ theme }) => theme.general.borderRadius};
  padding: 32px 40px;
  ${({ subscription }) => subscription && css`
    padding: 24px 40px;
  `}
  ${({ theme }) => theme.max('sm')`
    width: 100%;
    border-radius: 0;
    padding: 20px;
  `}
`;

const SettingsSectionInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.max('sm')`
    flex-direction: column;
    align-items: start;
  `}
`;

const TitledSection = styled.div`
  width: 100%;
  margin-bottom: 28px;
`;

const SettingsText = styled(p => <Text {...p} />)`
  font-size: ${({ theme }) => theme.font.size.small};
  letter-spacing: 2.2px;
  line-height: ${({ theme }) => theme.font.lineHeight.increased};
  margin-left: 40px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.gray.regular};
  text-transform: uppercase;
  ${({ theme }) => theme.max('sm')`
    margin-left: 20px;
  `}
`;

const LineButtonShift = styled(p => <LineButton {...p} />)`
  ${({ theme }) => theme.max('sm')`
      margin-left: 54px;
    `}
`;

const FreeIcon = styled(p => <Image {...p} />)`
  margin-right: 14px;
`;

const TextContainerBottom = styled(p => <TextContainer {...p} />)`
  max-width: 372px;
  margin-left: 40px;
  margin-top: 12px;
  ${({ theme }) => theme.max('sm')`
    margin-left: 20px;
  `}
`;

const SettingsHeading = styled(DashboardHeading)`
  && {
    margin-left: 38px;
    margin-bottom: 18px;
    ${p => p.theme.max('sm')`
      margin-left: 20px;
    `}
  }
`;

const TextWithIconContainer = styled.div`
  display: flex;
  ${({ theme }) => theme.max('sm')`
    align-items: start;
  `}
`;

export default SettingsPage;
