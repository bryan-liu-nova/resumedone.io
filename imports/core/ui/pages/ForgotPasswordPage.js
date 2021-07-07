import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { ValidatorForm } from 'react-form-validator-core';
import { Accounts } from 'meteor/accounts-base';
import { Analytics } from '/imports/core/api/analytics';

import {
  Page,
  Container,
  Flex,
  FormGroup,
  Label,
  Heading,
  Text,
  Box,
  ValidatedInput,
  Button,
  Link,
} from '/imports/core/ui/atoms/index';
import LoginHeader from '/imports/core/ui/components/MainHeader';
import HeaderBackground from '/imports/core/ui/components/HeaderBackground';
import PageHeadings from '/imports/core/ui/components/PageHeadings';
import { loginWithPassword } from '/imports/core/api/actions';
import { ERROR_MESSAGES } from '/imports/core/api/constants';
import Logo from '/imports/core/ui/components/Logo';

class ForgotPasswordPage extends PureComponent {
  state = {
    email: '',
    sent: false
  };

  componentDidMount() {
    Analytics.track('password_link_sent_view');
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    Accounts.forgotPassword({ email }, () => {
      this.setState({ sent: true });
    })
  };

  renderSent = () => {
    return (
      <BoxWide md={4} sm={8} xs={12}>
        <Heading level={2} color="white">Link sent</Heading>
        <Text>Please check your inbox</Text>
      </BoxWide>
    )
  };

  renderForm = () => {
    const { email } = this.state;
    return (
      <BoxWide md={4} sm={8} xs={12}>
        {this.state.error && <Error>{this.state.error}</Error>}
        <ValidatorForm
            onSubmit={this.onSubmit}
            noValidate
            instantValidate={false}
        >
          <FormGroup>
            <Label>Adresse e-mail*</Label>
            <ValidatedInput
                type="email"
                name="email"
                placeholder="Email"
                validators={['required', 'isEmail']}
                onChange={this.onChange}
                value={email}
                errorMessages={[ERROR_MESSAGES.required, ERROR_MESSAGES.email]}
            />
          </FormGroup>
          <SignInButton
              type="submit"
              // disabled={!this.isFormValid()}
          >
            <SignInButtonIcon stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" attr="[object Object]" height="1em" width="1em">
              <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
            </SignInButtonIcon>
            Se connecter
          </SignInButton>
        </ValidatorForm>
      </BoxWide>
    );
  };

  render() {
    return (
      <PageExt>
        <LoginHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Logo light huge />
            </Box>
            <Box>
              {/*<Menu items={menuItems} />*/}
            </Box>
          </Flex>
        </LoginHeader>
        <ContainerComp>
          <PageHeadings
              title="Get password reset link"
              subtitle="Please type in your email so we can send you a link to set new email"
          />
          <ContentSection>
            <Flex>
              {this.state.sent ? this.renderSent() : this.renderForm()}
            </Flex>
          </ContentSection>
        </ContainerComp>
        <HeaderBackground />
      </PageExt>
    );
  }
}

const PageExt = styled(Page)`
  background: #f7f7f7;
  min-height: 100vh;
  overflow: hidden;
  padding-bottom: 140px;
`;

const ContainerComp = styled(Container)`
  max-width: 850px;
  padding: 0 10px;
  font-family: ${({ theme }) => theme.font.family.openSans};
  ${({ theme }) => theme.max('xs')`
    padding: 0;
  `}
`;

const Error = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
  color: ${p => p.theme.colors.danger};
`;

const PasswordIcon = styled(p => <EyeIcon {...p} />)`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  fill: ${({ theme }) => theme.colors.gray.regular};
  font-size: 20px;
  cursor: pointer;
`;

const RegLink = styled(p => <Link {...p} />)`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.info};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SignInButton = styled(p => <Button {...p} />)`
  position: absolute;
  font-family: ${({ theme }) => theme.font.family.arial};
  font-size: 18px;
  font-weight: bold;
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 40px;
  background: ${({ theme }) => theme.colors.primary};
  min-width: 290px;
  padding: 18px 20px 19px 0;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  &:hover {
    text-decoration: underline;
  }
  &:disabled {
    text-decoration: none;
    opacity: 0.75;
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary};
    cursor: auto;
  }
`;

const SignInButtonIcon = styled.svg`
  position: absolute;
  top: 50%;
  right: 18px;
  font-size: 34px;
  transform: translateY(-50%);
`;

const BoxWide = styled(p => <Box {...p} />)`
  flex: 1;
`;

const ContentSection = styled.div`
  position: relative;
  background: #fff;
  margin: 0 0 30px 0;
  border-radius: ${p => p.theme.general.borderRadius};
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
  padding: 35px 40px;
  z-index: 999;
  &::after {
    content: '';
    clear: both;
    display: block;
  }
  ${({ theme }) => theme.max('xs')`
    padding: 25px 15px;
    border-radius: 0;
  `}
`;

export default ForgotPasswordPage;
