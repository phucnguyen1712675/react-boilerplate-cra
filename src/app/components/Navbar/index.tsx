import { useNavigate } from 'react-router-dom';

import { ROUTE_PATHS } from 'routes';
import { useFakeAuth } from 'hooks';
import { Button } from 'app/components';
import { useAuthUpdater } from 'services/auth';
import { showLoadingSwal, closeSwal } from 'utils/swal';
import { CustomLink } from 'app/components/Link';

const Navbar = () => {
  const fakeAuth = useFakeAuth();
  const setAuthenticated = useAuthUpdater();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      showLoadingSwal();
      await fakeAuth.handleLogout();
      setAuthenticated(false);
      navigate(ROUTE_PATHS.LOGIN);
      closeSwal();
    } catch (error) {
      closeSwal();
      throw new Error(error as string);
    }
  };

  return (
    <nav className="w-full bg-pale-blue py-8 shadow-sm">
      <div className="container mx-auto flex justify-around">
        <div className="flex items-center">
          <CustomLink
            to={ROUTE_PATHS.HOME}
            className="animated-underline text-2xl font-bold text-dark-blue"
          >
            CRUD APP
          </CustomLink>
        </div>
        {/*  <!-- left header section --> */}
        <div className="hidden items-center space-x-8 lg:flex">
          <CustomLink className="font-semibold" to={ROUTE_PATHS.HOME}>
            Posts
          </CustomLink>
          <CustomLink className="font-semibold" to={ROUTE_PATHS.USERS}>
            Users
          </CustomLink>
        </div>
        {/*  <!-- right header section --> */}
        <Button
          className="border-none bg-gray-400 !text-white"
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
