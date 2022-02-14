/**
 * Asynchronously loads the component for LoginPage
 */

import React from 'react';
import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components';

const LoginPage = lazyLoad(
  () => import('app/pages'),
  (module) => module.LoginPage,
  {
    fallback: <LoadingIndicator />,
  }
);

export default LoginPage;
