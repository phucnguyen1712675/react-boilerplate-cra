import { useNavigate } from 'react-router-dom';
import { EntityId } from '@reduxjs/toolkit';

import { useAppSelector } from 'hooks';
import { selectPostById } from 'store/postsSlice';
import { Button } from 'app/components';
import { PostAuthor } from 'app/pages/HomePage/features/posts/components';

type Props = {
  postId: EntityId;
};

const PostExcerpt = ({ postId }: Props) => {
  const post = useAppSelector((state) => selectPostById(state, postId));
  const navigate = useNavigate();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const handleViewPost = () => {
    navigate(`/posts/${postId}`);
  };

  return (
    <article
      className="border-[rgb(177, 174, 174)] flex flex-col gap-y-6 rounded-[7px] border p-4"
      key={post.id}
    >
      <div>
        <h3 className="text-2xl font-semibold">{post.title}</h3>
        <PostAuthor userId={post.userId} />
      </div>
      <p>{post.body.substring(0, 100)}</p>
      <Button className="self-start" onClick={handleViewPost}>
        View Post
      </Button>
    </article>
  );
};

export default PostExcerpt;
