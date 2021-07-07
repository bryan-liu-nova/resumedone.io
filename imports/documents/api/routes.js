// Layouts
import DocumentsLayout from '/imports/documents/ui/layouts/DocumentsLayout';

// Pages
import Policy from '../ui/pages/Policy';
import Terms from '../ui/pages/Terms';
import Disclaimer from '../ui/pages/Disclaimer';

export default [
  {
    component: Policy,
    layout: DocumentsLayout,
    path: '/policy',
    isPublic: true,
    exact: true
  },
  {
    component: Terms,
    layout: DocumentsLayout,
    path: '/tos',
    isPublic: true,
    exact: true
  },
  {
    component: Disclaimer,
    layout: DocumentsLayout,
    path: '/disclaimer',
    isPublic: true,
    exact: true
  }
];