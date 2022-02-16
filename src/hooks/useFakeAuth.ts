import { useAppSelector } from 'hooks';
import { selectAllUsers } from 'store/usersSlice';

/**
 * Fake authentication hook
 */
const useFakeAuth = () => {
  const users = useAppSelector(selectAllUsers);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const checkLogin = (email: string, _: string) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(
        () => resolve(!!users.find((user) => user.email === email)),
        1000
      );
    });
  };

  const checkLogout = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  };

  return { checkLogin, checkLogout };
};

export default useFakeAuth;
