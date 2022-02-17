import { ReactNode } from 'react';
import clsx from 'clsx';

import UnstyledLink from 'app/components/HashLink/UnstyledLink';

type Props = {
  children: ReactNode;
  href: string;
  className?: string;
};

const HashLink = ({ className, children, ...rest }: Props) => {
  return (
    <UnstyledLink
      {...rest}
      className={clsx(
        'hash-anchor inline-block font-bold focus:outline-none',
        className
      )}
    >
      {children}
    </UnstyledLink>
  );
};

export default HashLink;
