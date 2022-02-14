import React from 'react';
import { Outlet } from 'react-router-dom';

import { useDarkMode } from 'hooks';

const Layout = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <>
      <header className={`${darkMode ? 'dark' : 'light'} container`}>
        {/* <Header /> */}
        <button type="button" onClick={toggleDarkMode}>
          Toggle Theme
        </button>
      </header>

      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
