import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from './index.module.css';
import { WalletConnectorButton } from '../../containers/BlockChainProvider/components/WalletConnectorButton';
import { DEFAULT_CHAIN } from '../../../utils/helpers';
import { selectBlockChainProvider } from '../../containers/BlockChainProvider/selectors';

export function Header() {
  const { chainId, network } = useSelector(selectBlockChainProvider);
  return (
    <>
      {DEFAULT_CHAIN !== chainId && (
        <div className="bg-teal py-3 text-center text-black font-bold">
          {[30, 31].includes(chainId) ? (
            <>You are connected to {network} right now.</>
          ) : (
            <>You are in wrong network!</>
          )}
        </div>
      )}
      <header className="bg-black text-white py-8">
        <div className="flex flex-row justify-between items-center px-5">
          <div>
            <Link to="/" className={classNames('block', styles.logo)}>
              <span className="sr-only">Sovryn</span>
            </Link>
          </div>
          <div className="text-gray-400 hidden md:block">
            <WalletConnectorButton />
          </div>
        </div>
      </header>
    </>
  );
}
