import { Link } from 'react-router-dom';
import clsx from 'clsx';

import type { IUnstyledLinkProps } from 'interfaces';

function isExternal(url: string) {
  const match = url.match(
    // eslint-disable-next-line no-useless-escape
    /^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/
  );

  if (!match) {
    return false;
  }

  if (
    typeof match[1] === 'string' &&
    match[1].length > 0 &&
    match[1].toLowerCase() !== window.location.protocol
  ) {
    return true;
  }
  if (
    typeof match[2] === 'string' &&
    match[2].length > 0 &&
    match[2].replace(
      new RegExp(
        `:(${{ 'http:': 80, 'https:': 443 }[window.location.protocol]})?$`
      ),
      ''
    ) !== window.location.host
  ) {
    return true;
  }
  return false;
}

const UnstyledLink = ({
  children,
  to,
  className,
  ...rest
}: IUnstyledLinkProps) => {
  const isInternalLink = to && !isExternal(to);

  if (isInternalLink) {
    return (
      <Link to={to} {...rest} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={to}
      {...rest}
      className={clsx(className, 'cursor-[ne-resize]')}
    >
      {children}
    </a>
  );
};

export default UnstyledLink;
