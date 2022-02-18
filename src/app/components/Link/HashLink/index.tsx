import clsx from 'clsx';

import type { IUnstyledLinkProps } from 'interfaces';
import UnstyledLink from 'app/components/Link/components/UnstyledLink';

const HashLink = ({ className, children, ...rest }: IUnstyledLinkProps) => {
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
