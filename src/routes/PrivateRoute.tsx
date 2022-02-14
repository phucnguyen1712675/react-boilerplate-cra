import { ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { ROUTE_PATHS } from 'routes';
import { useAuthContext } from 'services/auth';

type Props = {
  children: ReactElement;
};

const PrivateRoute = ({ children }: Props) => {
  const { authenticated } = useAuthContext();
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to={ROUTE_PATHS.LOGIN} state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
