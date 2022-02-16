import { ReactNode, useMemo } from 'react';

import { createCtx } from 'helpers';
import { useLocalStorage } from 'hooks';
import type { SetValue } from 'types';

interface IAuthContextType {
  authenticated: boolean;
  setAuthenticated: SetValue<boolean>;
}

const [useAuthContext, AuthProvider] = createCtx<IAuthContextType>();

type Props = {
  children: ReactNode;
};

const AuthContextProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useLocalStorage(
    'authenticated',
    false
  );

  const value = useMemo(
    () => ({
      authenticated,
      setAuthenticated,
    }),
    [authenticated, setAuthenticated]
  );

  return <AuthProvider value={value}>{children}</AuthProvider>;
};

export { useAuthContext, AuthContextProvider };
