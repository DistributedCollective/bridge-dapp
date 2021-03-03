import React from 'react';
import classNames from 'classnames';
import styles from './index.module.css';

export function PageSkeleton() {
  return (
    <>
      <div
        className={classNames(
          styles.header,
          'bg-black px-5 flex items-center justify-start flex-grow-0 flex-shrink-0',
        )}
      >
        <div className={classNames(styles.logo, 'skeleton')}>Loading...</div>
      </div>
      <main>
        <div className="container py-8">
          <div
            className={classNames(styles.title, 'skeleton mb-16 w-3/5 mx-auto')}
          >
            Loading...
          </div>
          <div className="skeleton my-3 w-2/5">Loading...</div>
          <div className="flex space-x-4 my-3">
            <div className="skeleton w-1/3">Loading...</div>
            <div className="skeleton w-1/3">Loading...</div>
            <div className="skeleton w-1/3">Loading...</div>
          </div>
          <div className="skeleton my-3">Loading...</div>
          <div className="skeleton my-3 w-2/3">Loading...</div>
        </div>
      </main>
    </>
  );
}

export function RowSkeleton() {
  return (
    <div className="flex space-x-4">
      <div className="skeleton w-1/3">Loading...</div>
      <div className="skeleton w-1/3">Loading...</div>
      <div className="skeleton w-1/3">Loading...</div>
    </div>
  );
}
