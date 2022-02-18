import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  id?: string;
  className?: string;
};

const Section = ({ className, children, id }: Props) => {
  return (
    <section
      id={id}
      className={clsx(
        'container mx-auto flex max-w-2xl flex-col gap-y-8 pt-3 pb-4 sm:px-8 sm:pt-6 sm:pb-8',
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
