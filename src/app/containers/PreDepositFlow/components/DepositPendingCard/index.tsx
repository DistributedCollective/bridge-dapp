import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { DepositHistory, PreDepositFlowState } from '../../types';
import styles from '../WaitListCard/index.module.css';
import { DEFAULT_CHAIN, prettyTx } from '../../../../../utils/helpers';

interface Props {
  state: PreDepositFlowState;
}

export function DepositPendingCard({ state }: Props) {
  const [history, setHistory] = useState<DepositHistory>();

  useEffect(() => {
    const search = state.hsitory.find(
      item =>
        item.txHash.toLowerCase() === state.tx.txHash.toLowerCase() &&
        item.type === 'deposit',
    );
    setHistory(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(state.hsitory), state.tx.txHash]);

  return (
    <div className="container">
      <div className="w-full flex flex-col space-y-8 lg:flex-row lg:justify-between lg:items-stretch lg:space-y-0 lg:space-x-8">
        <div className="w-full lg:w-5/12">
          <article className="bg-black rounded-2xl p-8 lg:p-12 flex-grow h-full">
            <div className="w-full flex flex-col items-center justify-center">
              <h2 className="text-center">Transaction Details</h2>

              <p className="lead mb-8 italic font-light">
                Status {state.tx.status}
              </p>

              <div>
                <div className="font-bold mb-1">{state.tx.value} BTC</div>
                {history && (
                  <div className="font-light">
                    ≈{' '}
                    {history?.valueUsd.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    USD
                  </div>
                )}
              </div>

              <div style={{ minWidth: 250 }}>
                <p className="mt-12">
                  <span className="font-medium">To:{'   '}</span>
                  {prettyTx(state.depositAddress)}
                </p>
              </div>

              <a
                href={`https://www.blockchain.com/${
                  DEFAULT_CHAIN === 30 ? 'btc' : 'btc-testnet'
                }/tx/${state.tx.txHash}`}
                target="_blank"
                rel="noreferrer noopener"
                className={classNames(
                  'mt-16 rounded bg-gold bg-opacity-5 border border-gold text-gold block no-underline transition duration-500 whitespace-no-wrap hover:bg-opacity-50 hover:text-gold hover:no-underline',
                  styles.button,
                )}
              >
                View in Tracker
              </a>
            </div>
          </article>
        </div>
        <article className="w-full lg:w-7/12 flex flex-col justify-start items-center p-8">
          <h2 className="text-center mb-4">Have you heard about our vision?</h2>
          <p className="lead text-center">
            You are now one step closer to being a Sovryn individual. Learn more
            about our vision for Sovryn and plans for SOV
          </p>
          <div className="mt-12 flex flex-row items-center justify-around space-x-16">
            <div>
              <div className={styles.img} />
            </div>
            <div>
              <a
                href="https://docsend.com/view/mbhvi379crhagtwp"
                target="_blank"
                rel="noreferrer noopener"
                className={classNames(
                  'rounded bg-gold text-black font-bold block no-underline transition duration-500 whitespace-no-wrap hover:bg-opacity-50 hover:text-black hover:no-underline',
                  styles.button,
                )}
              >
                LEARN MORE
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
