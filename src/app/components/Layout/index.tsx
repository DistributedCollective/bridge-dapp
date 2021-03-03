import React from 'react';
import classNames from 'classnames';
import styles from './index.module.css';
import { Header } from '../Header';

interface Props {
  children?: React.ReactNode;
}

export function Layout(props: Props) {
  return (
    <>
      <Header />
      <main>
        <h1 className="my-8 flex flex-col space-y-8 lg:flex-row items-center justify-center text-white lg:space-x-4 lg:space-y-0">
          <div className={classNames('flex-shrink-0', styles.sovLogo)} />
          <div className="text-center lg:text-left">SOV ORIGIN PRE-ORDER</div>
        </h1>
        {props.children}
      </main>
    </>
  );
}
