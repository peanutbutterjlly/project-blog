import { Code } from 'bright';

import styles from './CodeSnippet.module.css';
import theme from './theme';

/**
 * A code snippet component which wraps the Bright Code component.
 * Uses the local theme and adds a wrapper class.
 *
 * @param {Object} props - Props passed to the Bright Code component.
 * @return {ReactElement} The Bright Code component.
 */
function CodeSnippet(props) {
  return (
    <Code
      {...props}
      theme={theme}
      className={styles.wrapper}
    />
  );
}

export default CodeSnippet;
