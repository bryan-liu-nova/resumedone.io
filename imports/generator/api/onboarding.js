import WizardStartPage from '/imports/generator/ui/pages/WizardStartPage';
import WizardExperience from '/imports/generator/ui/pages/WizardExperience';
import WizardEducation from '/imports/generator/ui/pages/WizardEducation';
import WizardSkills from '/imports/generator/ui/pages/WizardSkills';
import WizardSummary from '/imports/generator/ui/pages/WizardSummary';
import WizardFinalize from '/imports/generator/ui/pages/WizardFinalize';

export const RESUME_ONBOARDING_STEPS = [
  { status: 'start', title: 'Heading', component: WizardStartPage },
  { status: 'experience', title: 'Experience', component: WizardExperience, intro: true },
  { status: 'education', title: 'Education',component: WizardEducation, intro: true },
  { status: 'skills', title: 'Skills', component: WizardSkills, intro: true },
  { status: 'summary', title: 'Summary', component: WizardSummary, intro: true },
  { status: 'finish', title: 'Finalize', component: WizardFinalize }
];
