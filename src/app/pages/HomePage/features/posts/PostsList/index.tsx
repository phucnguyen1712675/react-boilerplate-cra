import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from 'hooks';
import { LoadingIndicator } from 'app/components';
import { fetchPosts, selectPostIds } from 'store/postsSlice';
import REQUEST_STATUS from 'constants/REQUEST_STATUS';
import {
  Section,
  SectionTitle,
} from 'app/pages/HomePage/features/posts/components';
import PostExcerpt from 'app/pages/HomePage/features/posts/PostsList/PostExcerpt';

const PostsList = () => {
  const dispatch = useAppDispatch();
  const orderedPostIds = useAppSelector(selectPostIds);
  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === REQUEST_STATUS.IDLE) {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === REQUEST_STATUS.LOADING) {
    content = <LoadingIndicator small />;
  } else if (postStatus === REQUEST_STATUS.SUCCEEDED) {
    content = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ));
  } else if (postStatus === REQUEST_STATUS.FAILED) {
    content = <div>{error}</div>;
  }

  return (
    <Section>
      <SectionTitle>Posts</SectionTitle>
      {content}
    </Section>
  );
};

export default PostsList;
