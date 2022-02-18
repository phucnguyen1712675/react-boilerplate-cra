import { ReactElement } from 'react';
import {
  useNavigate,
  useParams,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { EntityId } from '@reduxjs/toolkit';

import { useAppSelector, useAppDispatch } from 'hooks';
import { ROUTE_PATHS } from 'routes';
import type { LocationState } from 'types';
import { selectPostById, removePost } from 'store/postsSlice';
import REQUEST_STATUS from 'constants/REQUEST_STATUS';
import {
  showLoadingSwal,
  showSuccessSwal,
  closeSwal,
  showConfirmSwal,
} from 'utils/swal';
import { Section, SectionTitle, Button, Spinner } from 'app/components';
import { PostAuthor } from 'app/pages/HomePage/features/posts/components';

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useAppSelector((state) =>
    selectPostById(state, postId as EntityId)
  );
  const dispatch = useAppDispatch();
  const postStatus = useAppSelector((state) => state.posts.status);
  const postError = useAppSelector((state) => state.posts.error);
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState | undefined;
  const pathname = locationState?.from?.pathname;

  let from: string;
  if (pathname && pathname !== `/editPost/${postId}`) {
    from = pathname;
  } else {
    from = ROUTE_PATHS.HOME;
  }

  let content: ReactElement | null;

  if (postStatus === REQUEST_STATUS.LOADING) {
    content = <Spinner text="Loading" />;
  } else if (postStatus === REQUEST_STATUS.SUCCEEDED) {
    if (!post) {
      content = (
        <Navigate
          to="/notFoundPage"
          state={{
            helmetContent: 'Post not found',
            sectionTitle: 'Post not found!',
          }}
        />
      );
    } else {
      const handleEditPost = () => {
        navigate(`/editPost/${post.id}`);
      };

      const handleDeletePost = async () => {
        try {
          const { isConfirmed } = await showConfirmSwal();
          if (isConfirmed) {
            showLoadingSwal();
            await dispatch(removePost(post.id)).unwrap();
            closeSwal();
            await showSuccessSwal({
              title: 'Deleted!',
              text: 'Post edited successfully',
            });
            navigate(from);
          }
        } catch (error) {
          closeSwal();
          throw new Error(error as string);
        }
      };

      content = (
        <Section>
          <article className="flex flex-col gap-y-6">
            <div>
              <SectionTitle className="mb-[5px] leading-10 sm:text-[2.5rem]">
                {post.title}
              </SectionTitle>
              <PostAuthor userId={post.userId} />
            </div>
            <p>{post.body}</p>
            <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-4">
              <Button primary className="" onClick={handleEditPost}>
                Edit Post
              </Button>
              <Button danger className="" onClick={handleDeletePost}>
                Delete Post
              </Button>
            </div>
          </article>
        </Section>
      );
    }
  } else if (postStatus === REQUEST_STATUS.FAILED) {
    content = <div>{postError}</div>;
  } else {
    content = null;
  }

  return content;
};

export default SinglePostPage;
