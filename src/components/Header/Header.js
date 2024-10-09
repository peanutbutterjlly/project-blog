import clsx from 'clsx';
import { Rss } from 'react-feather';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import Link from 'next/link';
import DarkLightToggle from '../DarkLightToggle';
import styles from './Header.module.css';

function Header({ initialTheme, className, ...delegated }) {
  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Link href="/feed.xml">
            <Rss
              size="1.5rem"
              style={{
                // Optical alignment
                transform: 'translate(2px, -2px)',
              }}
            />

            <VisuallyHidden>View RSS feed</VisuallyHidden>
          </Link>
        </button>
        <DarkLightToggle initialTheme={initialTheme} className={styles.action} />
      </div>
    </header>
  );
}

export default Header;
