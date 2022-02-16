import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { ROUTE_PATHS } from 'routes';
import { useAuthContext } from 'services/auth';

const PrivateRoute = () => {
  const { authenticated } = useAuthContext();
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to={ROUTE_PATHS.LOGIN} state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
