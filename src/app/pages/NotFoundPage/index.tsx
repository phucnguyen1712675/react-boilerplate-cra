import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import { ROUTE_PATHS } from 'routes';
import { Navbar, PageWrapper, Section, SectionTitle } from 'app/components';
import { CustomLink } from 'app/components/Link';

type NotFoundPageLocationState = {
  helmetTitle?: string;
  helmetContent?: string;
  sectionTitle?: string;
  returnRoute?: ROUTE_PATHS;
  instruction?: string;
};

const NotFoundPage = () => {
  const location = useLocation();
  const locationState = location.state as NotFoundPageLocationState | undefined;
  const {
    helmetTitle = '404 Page not found',
    helmetContent = 'Page not found',
    sectionTitle = 'Page not found!',
    returnRoute = ROUTE_PATHS.HOME,
    instruction = 'Return to Home Page',
  } = locationState || {};

  return (
    <>
      <Helmet>
        <title>{helmetTitle}</title>
        <meta name="description" content={helmetContent} />
      </Helmet>
      <Navbar />
      <PageWrapper className="p-4">
        <Section>
          <SectionTitle className="text-3xl text-desaturated-blue">
            {sectionTitle}
          </SectionTitle>
          <CustomLink className="self-start font-semibold" to={returnRoute}>
            {instruction}
          </CustomLink>
        </Section>
      </PageWrapper>
    </>
  );
};

export default NotFoundPage;
