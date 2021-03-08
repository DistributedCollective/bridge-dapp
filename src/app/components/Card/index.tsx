import React from 'react';
import classNames from 'classnames';
import styles from './index.module.css';

interface Props {
  children: React.ReactNode;
  className?: string;
  theme?: 'dark' | 'light';
}

/**
 * @deprecated
 * @param props
 * @constructor
 */
export function Card(props: Props) {
  return (
    <div className="container px-3 lg:px-32">
      <article
        className={classNames(
          'rounded-2xl p-8 lg:p-12 lg:px-24 xl:px-48',
          styles.card,
          props.className,
          props.theme === 'light' ? 'bg-dark' : 'bg-black',
        )}
      >
        {props.children}
      </article>
    </div>
  );
}

Card.defaultProps = {
  theme: 'light',
};
