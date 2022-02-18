/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ROUTE_PATHS, PrivateRoute, PublicRoute } from 'routes';
import { AuthProvider } from 'services/auth';
import HomePage from 'app/pages/HomePage/Loadable';
import LoginPage from 'app/pages/LoginPage/Loadable';
import NotFoundPage from 'app/pages/NotFoundPage/Loadable';
import {
  PostsPage,
  EditPostForm,
  SinglePostPage,
} from 'app/pages/HomePage/features/posts';
import { UserPage, UsersList } from 'app/pages/HomePage/features/users';

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

      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path={ROUTE_PATHS.HOME} element={<HomePage />}>
              <Route index element={<PostsPage />} />
              <Route path={ROUTE_PATHS.POST} element={<SinglePostPage />} />
              <Route path={ROUTE_PATHS.EDIT_POST} element={<EditPostForm />} />
              <Route path={ROUTE_PATHS.USERS} element={<UsersList />} />
              <Route path={ROUTE_PATHS.USER} element={<UserPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
