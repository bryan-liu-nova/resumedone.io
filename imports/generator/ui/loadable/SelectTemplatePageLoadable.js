import Loadable from 'react-loadable';

import Loading from '/imports/core/ui/components/LoadingEmpty';

export default Loadable({
  loader: () => import('../pages/SelectTemplatePage'),
  loading: Loading,
});
