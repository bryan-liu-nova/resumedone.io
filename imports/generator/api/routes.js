import GeneratorPageLoadable from '../ui/loadable/GeneratorPageLoadable';
import PreviewPageLoadable from '../ui/loadable/PreviewPageLoadable';
import SelectTemplatePageLoadable from '../ui/loadable/SelectTemplatePageLoadable';

export default [
  {
    component: PreviewPageLoadable,
    path: '/resume/:resumeId/preview',
    exact: true
  },
  {
    component: GeneratorPageLoadable,
    path: '/resume/:resumeId/:step/:intro?',
    exact: true
  },
  {
    component: SelectTemplatePageLoadable,
    path: '/resume/create',
    exact: true
  }
];
