import { Link, useNavigate } from 'react-router-dom';

import { ROUTE_PATHS } from 'routes';
import { useFakeAuth } from 'hooks';
import { Button } from 'app/components';
import { useAuthContext } from 'services/auth';
import { showLoadingSwal, closeSwal } from 'utils/swal';

const Navbar = () => {
  const fakeAuth = useFakeAuth();
  const auth = useAuthContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      showLoadingSwal();
      await fakeAuth.handleLogout();
      closeSwal();
      auth.setAuthenticated(false);
      navigate(ROUTE_PATHS.LOGIN);
    } catch (error) {
      closeSwal();
      throw new Error(error as string);
    }
  };

  return (
    <nav className="w-full bg-pale-blue py-8 shadow-sm">
      <div className="container mx-auto flex justify-around">
        <div className="flex items-center">
          <Link
            to={ROUTE_PATHS.HOME}
            className="animated-underline text-2xl font-bold text-dark-blue"
          >
            CRUD APP
          </Link>
        </div>
        {/*  <!-- left header section --> */}
        <div className="hidden items-center space-x-8 lg:flex">
          <Link className="font-medium" to={ROUTE_PATHS.HOME}>
            Posts
          </Link>
          <Link className="font-medium" to={ROUTE_PATHS.USERS}>
            Users
          </Link>
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
