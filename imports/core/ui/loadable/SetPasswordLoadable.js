import Loadable from 'react-loadable';

import Loading from '/imports/core/ui/components/Loading';

export default Loadable({
  loader: () => import('../pages/SetPasswordPage'),
  loading: Loading,
});
