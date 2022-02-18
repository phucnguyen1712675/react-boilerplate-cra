import clsx from 'clsx';

import type { IUnstyledLinkProps } from 'interfaces';
import { HashLink } from 'app/components/Link';

const SectionTitle = ({
  to,
  className,
  children,
  ...rest
}: IUnstyledLinkProps) => {
  if (!to) {
    return (
      <h2
        {...rest}
        className={clsx('text-2xl font-bold text-dark-blue', className)}
      >
        {children}
      </h2>
    );
  }

  return (
    <HashLink
      to={to}
      {...rest}
      className={clsx('self-start text-2xl text-dark-blue', className)}
    >
      <h2>{children}</h2>
    </HashLink>
  );
};

export default SectionTitle;
