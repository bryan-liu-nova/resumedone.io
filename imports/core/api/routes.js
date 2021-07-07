// Layouts
import PublicLayout from '/imports/core/ui/layouts/PublicLayout';

// Pages
import LoginPage from '/imports/core/ui/loadable/LoginPageLoadable';
import ForgotPasswordPage from '/imports/core/ui/loadable/ForgotPasswordLoadable';
import SetPasswordPage from '/imports/core/ui/loadable/SetPasswordLoadable';
import PrivacyPolicyPage from '/imports/core/ui/loadable/PrivacyPolicyLoadable';
import TCPage from '/imports/core/ui/loadable/TCLoadable';

export default [
  {
    component: LoginPage,
    layout: PublicLayout,
    isPublic: true,
    redirectLogged: true,
    path: '/sign-in'
  },
  {
    component: ForgotPasswordPage,
    layout: PublicLayout,
    isPublic: true,
    redirectLogged: true,
    path: '/set-new-password'
  },
  {
    component: SetPasswordPage,
    layout: PublicLayout,
    isPublic: true,
    redirectLogged: true,
    path: '/set-password/:token'
  },
  {
    component: PrivacyPolicyPage,
    layout: PublicLayout,
    isPublic: true,
    redirectLogged: false,
    path: '/privacy-policy'
  },
  {
    component: TCPage,
    layout: PublicLayout,
    isPublic: true,
    redirectLogged: false,
    path: '/terms-and-conditions'
  }
];
