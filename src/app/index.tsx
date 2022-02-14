/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ROUTE_PATHS, PrivateRoute, PublicRoute } from 'routes';
import { Layout } from 'app/components';
import { AuthContextProvider } from 'services/auth';
import HomePage from 'app/pages/HomePage/Loadable';
import LoginPage from 'app/pages/LoginPage/Loadable';
import NotFoundPage from 'app/pages/NotFoundPage/Loadable';

const App = () => {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <AuthContextProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
          </Route>
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path={ROUTE_PATHS.HOME} element={<HomePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
