import { useAppSelector } from 'hooks';
import { selectAllUsers } from 'store/usersSlice';
import { Section, SectionTitle } from 'app/components';
import { CustomLink } from 'app/components/Link';

const UsersList = () => {
  const users = useAppSelector(selectAllUsers);

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <CustomLink to={`/users/${user.id}`}>{user.name}</CustomLink>
    </li>
  ));

  return (
    <Section id="users">
      <SectionTitle to="#users">Users</SectionTitle>
      <ul>{renderedUsers}</ul>
    </Section>
  );
};

export default UsersList;
