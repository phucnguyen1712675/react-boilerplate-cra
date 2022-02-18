import { useState, ReactNode } from 'react';
import ReactPaginate from 'react-paginate';

import { useAppSelector } from 'hooks';
import { selectPostIds } from 'store/postsSlice';
import REQUEST_STATUS from 'constants/REQUEST_STATUS';
import { Section, SectionTitle, Spinner } from 'app/components';
import PostExcerpt from 'app/pages/HomePage/features/posts/PostsList/PostExcerpt';
import styles from 'app/pages/HomePage/features/posts/PostsList/PostsList.module.scss';

const POST_PER_PAGE = 10;

type OnPageChangeParam = {
  selected: number;
};

const PostsList = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const orderedPostIds = useAppSelector(selectPostIds);
  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  let content: ReactNode;

  if (postStatus === REQUEST_STATUS.LOADING) {
    content = <Spinner text="Loading" />;
  } else if (postStatus === REQUEST_STATUS.SUCCEEDED) {
    const postsVisited = pageNumber * POST_PER_PAGE;
    const displayedPosts = orderedPostIds
      .slice(postsVisited, postsVisited + POST_PER_PAGE)
      .map((postId) => <PostExcerpt key={postId} postId={postId} />);
    const pageCount = Math.ceil(orderedPostIds.length / POST_PER_PAGE);

    const handlePageChange = ({ selected }: OnPageChangeParam) => {
      setPageNumber(selected);
    };

    content = (
      <>
        {displayedPosts}
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={styles.paginationBtns}
          previousLinkClassName={styles.previousBtn}
          nextLinkClassName={styles.nextBtn}
          disabledClassName={styles.paginationDisabled}
          activeClassName={styles.paginationActive}
        />
      </>
    );
  } else if (postStatus === REQUEST_STATUS.FAILED) {
    content = <div>{error}</div>;
  }

  return (
    <Section id="posts-list">
      <SectionTitle to="#posts-list">Posts</SectionTitle>
      {content}
    </Section>
  );
};

export default PostsList;
