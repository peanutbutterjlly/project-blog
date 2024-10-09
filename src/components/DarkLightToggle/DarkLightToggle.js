'use client';
import { DARK_TOKENS, LIGHT_TOKENS } from '@/constants';
import Cookie from 'js-cookie';
import { useState } from 'react';
import { Moon, Sun } from 'react-feather';
import VisuallyHidden from '../VisuallyHidden';

export default function DarkLightToggle({initialTheme, ...props}) {
  const [theme, setTheme] = useState(initialTheme);

  /**
   * @function
   * @description Handles the state change of the theme between light and dark.
   * @param {void}
   * @returns {void}
   */
  function handleClick() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);

    Cookie.set('color-theme', nextTheme, {
      expires: 1000,
    });

    const root = document.documentElement;
    const colors = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;

    root.setAttribute('data-color-theme', nextTheme);

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <button {...props} onClick={handleClick}>
      {theme === 'light' ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}
