import clsx from 'clsx';

import type { IUnstyledLinkProps } from 'interfaces';
import UnstyledLink from 'app/components/Link/components/UnstyledLink';

const CustomLink = ({ className, children, ...rest }: IUnstyledLinkProps) => {
  return (
    <UnstyledLink
      {...rest}
      className={clsx(
        'animated-underline inline-flex items-center hover:text-[#00c4fd] focus:text-[#00c4fd] focus:outline-none',
        className
      )}
    >
      {children}
    </UnstyledLink>
  );
};

export default CustomLink;
