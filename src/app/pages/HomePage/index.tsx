import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'hooks';
import { fetchPosts } from 'store/postsSlice';
import REQUEST_STATUS from 'constants/REQUEST_STATUS';
import { Navbar, PageWrapper } from 'app/components';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const postStatus = useAppSelector((state) => state.posts.status);

  useEffect(() => {
    if (postStatus === REQUEST_STATUS.IDLE) {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

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
