import { useEffect, useState } from 'react';

const LIGHT_THEME = 'LIGHT_THEME';
const DARK_THEME = 'DARK_THEME';

const useDarkMode = (): [boolean, () => void] => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.theme === DARK_THEME
  );

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const html = window.document.documentElement;

    const prev = darkMode ? LIGHT_THEME : DARK_THEME;
    html.classList.remove(prev);

    const next = darkMode ? DARK_THEME : LIGHT_THEME;
    html.classList.add(next);

    localStorage.setItem('theme', next);
  }, [darkMode]);

  return [darkMode, toggleDarkMode];
};

export default useDarkMode;
