import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { ValidatorForm } from 'react-form-validator-core';
import { Link } from 'react-router-dom';
import { Analytics } from '/imports/core/api/analytics';

import {
  Page,
  Container,
  Flex,
  FormGroup,
  Label,
  Box,
  ValidatedInput,
  Button,
} from '/imports/core/ui/atoms/index';
import LoginHeader from '/imports/core/ui/components/MainHeader';
import Menu from '/imports/core/ui/components/HeaderMenu';
import HeaderBackground from '/imports/core/ui/components/HeaderBackground';
import PageHeadings from '/imports/core/ui/components/PageHeadings';
import { loginWithPassword } from '/imports/core/api/actions';
import { ERROR_MESSAGES } from '/imports/core/api/constants';
import Logo from '/imports/core/ui/components/Logo';
import Navbar from '/imports/core/ui/components/Navbar';
import ResumesPageLoadable from '/imports/dashboard/ui/loadable/ResumesPageLoadable';

const menuItems = [
  {
    value: 'Creer un CV',
    link: '/onboard/start'
  },
  {
    value: 'Se connecter',
    link: '/sign-in'
  }
];

const EyeIcon = ({ visible, className, onClick }) => {
  return (
    <div onClick={onClick}>
      {
        visible ?
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" attr="[object Object]" height="1em" width="1em" className={className}>
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
        </svg>
        : <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" attr="[object Object]" height="1em" width="1em" className={className}>
          <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path>
        </svg>
      }
    </div>
  );
};

class LoginPage extends PureComponent {
  state = {
    email: '',
    password: '',
    passwordVisible: false,
    isPasswordValid: false,
    isEmailValid: false,
    error: ''
  };

  componentDidMount() {
    Analytics.track('login_page');
    ResumesPageLoadable.preload();
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    loginWithPassword(email, password).catch(e => {
      this.setState({ error: e.message });
    });
  };

  isFormValid = () => {
    const { email, password, isEmailValid, isPasswordValid } = this.state;
    return email && password && isEmailValid && isPasswordValid;
  };

  render() {
    const { email, password, passwordVisible } = this.state;
    const text = localStorage.getItem('resumedone:password-set') ? 'Forgot password?' : 'Set password';
    return (
      <PageExt>
        <LoginHeader>
          <Navbar menuItems={menuItems} />
        </LoginHeader>
        <ContainerComp>
          <PageHeadings
              title="Se connecter"
              subtitle="Introduisez votre adresse e-mail et votre mot de passe pour accéder à votre compte."
          />
          <ContentSection>
            <Flex>
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
                  <FormGroup>
                    <Label>Mot de passe*</Label>
                    <ValidatedInput
                        type={passwordVisible ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        validators={['required']}
                        onChange={this.onChange}
                        value={password}
                        errorMessages={[ERROR_MESSAGES.required]}
                    >
                      <PasswordIcon
                          visible={passwordVisible}
                          onClick={() => this.setState({ passwordVisible: !passwordVisible })}
                      />
                    </ValidatedInput>
                  </FormGroup>
                  <Flex>
                    <Box grow={1}>
                    </Box>
                    <Box>
                      <RegLink to="/set-new-password">{text}</RegLink>
                    </Box>
                  </Flex>
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
  text-decoration: none;
  display: inline-block;
  text-align: center;
  // transition: border .5s;
  border: 0;
  background: ${({ theme }) => theme.colors.darkOrange};
  color: #FFFFFF;
  font-size: 1.3125rem;
  line-height: 3.6875rem;
  font-family: ${({ theme }) => theme.font.family.accent};
  font-weight: 700;
  border-radius: 6px;
  height: 3.6rem;
  width: 14.2rem;
  z-index: 30;
  margin: 1.5rem 0 .7rem;
  &:hover {
    background: ${({ theme }) => theme.colors.orange};
  }
  position: absolute;
  font-family: ${({ theme }) => theme.font.family.arial};
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 290px;
  padding: 0;
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

export default LoginPage;
