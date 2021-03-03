import React, { useRef } from 'react';
import classNames from 'classnames';
import styles from './index.module.css';

interface Props {
  label: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  labelClassName?: string;
  placeholder?: string;
  type?: 'text' | 'email';
  small?: boolean;
}

export function Input({
  label,
  className,
  labelClassName,
  value,
  onChange,
  ...props
}: Props) {
  const ref = useRef(
    Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15),
  );
  return (
    <div>
      {label && (
        <label
          htmlFor={ref.current}
          className={classNames('block mb-3', styles.label, labelClassName)}
        >
          {label}
        </label>
      )}
      <input
        id={ref.current}
        className={classNames(
          'block border-0 rounded-xl bg-white text-black placeholder-lightdark mb-3',
          styles.input,
          props.small ? styles.inputSmall : '',
          className,
        )}
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
        {...props}
      />
    </div>
  );
}
