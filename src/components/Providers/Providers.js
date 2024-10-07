'use client';
import { MotionConfig } from 'framer-motion';

/**
 * Wrap the app with Framer Motion's `MotionConfig` component,
 * which sets up the global animation config.
 *
 * @function Providers
 * @param {object} props
 * @param {ReactNode} props.children App component hierarchy.
 * @returns {ReactElement} `<MotionConfig>` component.
 */
function Providers({children}) {
  return <MotionConfig>{children}</MotionConfig>;
}

export default Providers;
