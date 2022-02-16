import { useNavigate, useParams } from 'react-router-dom';
import { EntityId } from '@reduxjs/toolkit';

import { useAppSelector } from 'hooks';
import { Button } from 'app/components';
import { selectPostById } from 'store/postsSlice';
import {
  PostAuthor,
  Section,
} from 'app/pages/HomePage/features/posts/components';

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useAppSelector((state) =>
    selectPostById(state, postId as EntityId)
  );
  const navigate = useNavigate();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const handleEditPost = () => {
    navigate(`/editPost/${post.id}`);
  };

  return (
    <Section>
      <article className="border-[rgb(177, 174, 174)] flex flex-col gap-y-3 rounded-[7px] border p-4">
        <div>
          <h2 className="text-3xl">{post.title}</h2>
          <PostAuthor userId={post.userId} />
        </div>
        <p>{post.body}</p>
        <Button className="self-start" onClick={handleEditPost}>
          Edit Post
        </Button>
      </article>
    </Section>
  );
};

export default SinglePostPage;
