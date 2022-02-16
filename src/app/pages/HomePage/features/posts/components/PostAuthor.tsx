import React from 'react';

import { useAppSelector } from 'hooks';
import { selectUserById } from 'store/usersSlice';

type Props = {
  userId: number;
};

const PostAuthor = ({ userId }: Props) => {
  const author = useAppSelector((state) => selectUserById(state, userId));

  return <span>by {author ? author.name : 'Unknown author'}</span>;
};

export default PostAuthor;
