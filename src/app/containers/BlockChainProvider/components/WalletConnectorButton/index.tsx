import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { prettyTx } from 'utils/helpers';
import styles from './index.module.css';
import { selectBlockChainProvider } from '../../selectors';
import { walletConnection } from '../../web3-modal';
import { Button } from '../../../../components/Button';

export function WalletConnectorButton() {
  const { connected, connecting, address } = useSelector(
    selectBlockChainProvider,
  );

  const handleWalletConnection = useCallback(() => {
    walletConnection
      .connect()
      .then(() => {})
      .catch(console.error);
  }, []);

  const handleDisconnect = () => {
    walletConnection.disconnect().then(() => {});
  };

  return (
    <>
      {!connected && !address ? (
        <Button
          text={connecting ? <>Connecting....</> : <>Engage Wallet</>}
          disabled={connecting}
          loading={connecting}
          onClick={handleWalletConnection}
        />
      ) : (
        <div
          className={classNames(
            styles.wrapper,
            'rounded-lg flex flex-row items-center justify-between bg-gray cursor-default',
          )}
        >
          <div className="flex flex-row items-center justify-between px-3">
            <div className="whitespace-no-wrap font-bold text-small select-none">
              {prettyTx(address, 5, 3)}
            </div>
            <div className="bg-teal rounded-full w-4 h-4 ml-3" />
          </div>
          <button
            className={classNames(styles.button, 'cursor-pointer')}
            onClick={handleDisconnect}
          >
            <span className="sr-only">Log out</span>
          </button>
        </div>
      )}
    </>
  );
}
