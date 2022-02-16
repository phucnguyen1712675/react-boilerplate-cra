import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

import { Navbar, PageWrapper } from 'app/components';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Homepage" />
      </Helmet>
      <Navbar />
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </>
  );
};

export default HomePage;
