'use client'
import clsx from 'clsx';
import { motion } from 'framer-motion';
import {
  Pause,
  Play,
  RotateCcw
} from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import { useEffect, useId, useState } from 'react';
import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const [colorIdx, setColorIdx] = useState(0);  
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    let intervalId;

    function handleSetTime() {
      const newTimeElapsed = timeElapsed + 1;
      const newColorIndex = newTimeElapsed % COLORS.length;
      setColorIdx(newColorIndex);
      setTimeElapsed(newTimeElapsed);
    }

    intervalId = setInterval(handleSetTime, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying, timeElapsed]);

  const selectedColor = COLORS[colorIdx];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li layoutId={index} className={styles.color} key={index}>
              {isSelected && <div className={styles.selectedColorOutline} />}
              <motion.div
                layoutId={`${id}-selected-color-outline`}
                className={clsx(styles.colorBox, isSelected && styles.selectedColorBox)}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </motion.div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <>
                <Pause />
                <VisuallyHidden>Pause</VisuallyHidden>
              </>
            ) : (
              <>
                <Play />
                <VisuallyHidden>Play</VisuallyHidden>
              </>
            )}
          </button>
          <button onClick={() => {
            setIsPlaying(false);
            setColorIdx(0);
            setTimeElapsed(0);
          }}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
