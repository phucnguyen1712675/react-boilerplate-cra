/**
 * Asynchronously loads the component for LoginPage
 */

import { lazyLoad } from 'utils/loadable';
import { LoadingPage } from 'app/components';

const LoginPage = lazyLoad(
  () => import('app/pages'),
  (module) => module.LoginPage,
  {
    fallback: <LoadingPage />,
  }
);

export default LoginPage;
