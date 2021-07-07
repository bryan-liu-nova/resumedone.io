import React, { PureComponent } from 'react';
import OnboardingLayout from '/imports/onboarding/ui/layouts/OnboardingLayout';
import { Page, Box } from '/imports/core/ui/atoms';
import { OnboardingTitle, OnboardingSubTitle } from '/imports/onboarding/ui/atoms';
import OnboardingProgress from '../components/OnboardingProgress';
import OnboardingSlider from '../components/OnboardingSlider';

export default ({ experiment, onSelect }) => (
  <OnboardingLayout experiment={experiment} onSelect={onSelect}>
    <Page>
      <OnboardingTitle experiment={experiment}>Select a Template</OnboardingTitle>
      {(experiment == '0' || experiment == '2' || experiment == '3') && (
        <Box alignX="center">
          <OnboardingProgress sections={2} progress={1 / 8} />
        </Box>
      )}
      <OnboardingSubTitle experiment={experiment}>To get started, select a resume template below.</OnboardingSubTitle>
      <OnboardingSlider experiment={experiment} onSelect={onSelect} />
    </Page>
  </OnboardingLayout>
)
