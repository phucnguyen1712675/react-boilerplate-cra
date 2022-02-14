import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { ROUTE_PATHS } from 'routes';
import { useAuthContext } from 'services/auth';

const PublicRoute = () => {
  const { authenticated } = useAuthContext();
  const location = useLocation();

  if (authenticated) {
    return <Navigate to={ROUTE_PATHS.HOME} state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PublicRoute;
