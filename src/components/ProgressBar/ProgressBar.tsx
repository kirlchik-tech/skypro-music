import styles from './ProgressBar.module.css';
import { ChangeEvent } from 'react';

type ProgressBarProp = {
  max: number;
  value: number;
  step: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function ProgressBar({ max, value, step, onChange }: ProgressBarProp) {
  return (
    <input
      className={styles.styledProgressInput}
      type="range"
      min="0"
      max={max || 0}
      value={value}
      step={step}
      onChange={onChange}
    />
  );
}