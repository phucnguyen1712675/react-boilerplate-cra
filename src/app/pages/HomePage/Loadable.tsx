/**
 * Asynchronously loads the component for HomePage
 */

import { ReactNode } from 'react';
import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components';

type Props = {
  children: ReactNode;
};

const LoadingWrapper = ({ children }: Props) => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      {children}
    </div>
  );
};

const HomePage = lazyLoad(
  () => import('app/pages'),
  (module) => module.HomePage,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  }
);

export default HomePage;
