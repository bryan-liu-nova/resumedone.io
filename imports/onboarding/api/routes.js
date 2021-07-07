// Layouts
import OnboardingLayout from '/imports/onboarding/ui/layouts/OnboardingLayout';

// Pages
import StartPage from '/imports/onboarding/ui/loadable/StartPageLoadable';
import SocialPage from '/imports/onboarding/ui/loadable/SocialPageLoadable';
import NamePage from '/imports/onboarding/ui/loadable/NamePageLoadable';
import ContactPage from '/imports/onboarding/ui/loadable/ContactPageLoadable';

export default [
  {
    component: StartPage,
    isPublic: true,
    // redirectLogged: true,
    path: '/onboard/start'
  },
  {
    component: SocialPage,
    layout: OnboardingLayout,
    isPublic: true,
    // redirectLogged: true,
    path: '/onboard/social'
  },
  {
    component: NamePage,
    layout: OnboardingLayout,
    path: '/onboard/name'
  },
  {
    component: ContactPage,
    layout: OnboardingLayout,
    path: '/onboard/contact'
  },
];
