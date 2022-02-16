import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  className?: string;
};

const PageWrapper = ({ children, className }: Props) => {
  return (
    <main className={clsx('my-0 mx-auto box-content py-0 px-6', className)}>
      {children}
    </main>
  );
};

export default PageWrapper;
