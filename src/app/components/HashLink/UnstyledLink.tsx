/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  href: string;
  className?: string;
};

const UnstyledLink = ({ children, href, className, ...rest }: Props) => {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link to={href}>
        <a {...rest} className={className}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...rest}
      className={clsx(className, 'cursor-[ne-resize]')}
    >
      {children}
    </a>
  );
};

export default UnstyledLink;
