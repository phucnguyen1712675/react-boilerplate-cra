import React from 'react';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Homepage" />
      </Helmet>
      {/* <NavBar />
      <PageWrapper>
        <Masthead />
        <Features />
      </PageWrapper> */}
    </>
  );
};

export default HomePage;
