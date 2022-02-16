import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <main className="p-4">
        <p>Page not found</p>
        <Link to={ROUTE_PATHS.HOME}>Return to Home Page</Link>
      </main>
      {/* <NavBar />
      <Wrapper>
        <Title>
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </Title>
        <P>Page not found.</P>
        <Link to={process.env.PUBLIC_URL + '/'}>Return to Home Page</Link>
      </Wrapper> */}
    </>
  );
};

export default NotFoundPage;
