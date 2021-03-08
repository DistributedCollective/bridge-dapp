import React from 'react';
import classNames from 'classnames';
import styles from './index.module.css';

interface Props {
  text: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * @deprecated
 * @param text
 * @param className
 * @param loading
 * @param props
 * @constructor
 */
export function Button({ text, className, loading, ...props }: Props) {
  return (
    <button
      {...props}
      className={classNames(
        'transition duration-300 whitespace-no-wrap',
        styles.button,
        loading && 'cursor-not-allowed',
        props.disabled && 'opacity-25 cursor-not-allowed',
        className,
      )}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  className:
    'border border-gold rounded-xl bg-gold bg-opacity-5 text-gold hover:bg-opacity-25',
};
