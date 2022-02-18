import { useParams, Navigate } from 'react-router-dom';
import { EntityId } from '@reduxjs/toolkit';

import { ROUTE_PATHS } from 'routes';
import { useAppSelector } from 'hooks';
import { selectUserById } from 'store/usersSlice';
import { selectPostsByUser } from 'store/postsSlice';
import { Section, SectionTitle } from 'app/components';
import { CustomLink } from 'app/components/Link';

const UserPage = () => {
  const { userId } = useParams();
  const user = useAppSelector((state) =>
    selectUserById(state, userId as EntityId)
  );
  const postsForUser = useAppSelector((state) =>
    selectPostsByUser(state, userId as EntityId)
  );

  if (!user) {
    return (
      <Navigate
        to="/notFoundPage"
        state={{
          helmetContent: 'User not found',
          sectionTitle: 'User not found!',
          returnRoute: ROUTE_PATHS.USERS,
          instruction: 'Return to Users Page',
        }}
      />
    );
  }

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <CustomLink to={`/posts/${post.id}`}>{post.title}</CustomLink>
    </li>
  ));

  return (
    <Section id="user">
      <SectionTitle to="#user">{user.name}</SectionTitle>
      <ul>{postTitles}</ul>
    </Section>
  );
};

export default UserPage;
