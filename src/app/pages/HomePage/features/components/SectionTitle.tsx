import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  className?: string;
};

const SectionTitle = ({ className, children }: Props) => {
  return (
    <h2
      className={clsx(
        'text-start flex-initial text-2xl font-bold text-dark-blue',
        className
      )}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
