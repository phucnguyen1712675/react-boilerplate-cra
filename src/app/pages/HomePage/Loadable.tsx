/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';
import { LoadingPage } from 'app/components';

const HomePage = lazyLoad(
  () => import('app/pages'),
  (module) => module.HomePage,
  {
    fallback: <LoadingPage />,
  }
);

export default HomePage;
