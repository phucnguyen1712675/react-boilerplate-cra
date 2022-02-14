import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const PageWrapper = ({ children }: Props) => {
  return (
    <div className="my-0 mx-auto box-content w-[960px] py-0 px-6">
      {children}
    </div>
  );
};

export default PageWrapper;
