import React from 'react';
import classNames from 'classnames';
import { Card } from '../../../../components/Card';
import styles from './index.module.css';

export function WaitListCard() {
  return (
    <Card>
      <div className="w-full flex flex-col items-center justify-center">
        <h2>Origin Pre-Deposits are now CLOSED</h2>
        <p className="lead text-center mb-24">
          Thank you for your interest but we already sold out, if you have an
          invite in another email and already generated BTC deposit address you
          can still join Origin - just keep in mind pre-deposit limits!
        </p>
        <div className="mb-12 flex flex-row items-center justify-around space-x-16">
          <div>
            <div className={styles.img} />
          </div>
          <div>
            <a
              href="https://sovryn.app"
              target="_blank"
              rel="noreferrer noopener"
              className={classNames(
                'rounded bg-gold text-black font-bold block no-underline transition duration-500 hover:bg-opacity-50 hover:text-black hover:no-underline',
                styles.button,
              )}
            >
              Go Sovryn
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}
