import { ReactNode } from 'react';

import { LocationState } from 'types';

interface IUnstyledLinkProps {
  children: ReactNode;
  className?: string;
  to?: string;
  state?: LocationState;
}

export default IUnstyledLinkProps;
