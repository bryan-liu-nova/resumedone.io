// Layouts
import DashboardLayout from '/imports/dashboard/ui/layouts/DashboardLayout';

// Pages
import ResumesPage from '/imports/dashboard/ui/loadable/ResumesPageLoadable';
import SettingsPage from '/imports/dashboard/ui/loadable/SettingsPageLoadable';

export default [
  {
    component: ResumesPage,
    layout: DashboardLayout,
    path: '/resumes'
  },
  {
    component: SettingsPage,
    layout: DashboardLayout,
    path: '/account'
  }
];
