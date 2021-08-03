import React from 'react';
import { getWalletName } from '../utils';
import { TransactionMessage } from '../styled';
import { ICommonProps } from '../types';
import { WalletLogo } from './WalletLogo';

export const StepConfirm: React.FC<ICommonProps> = ({ walletName }) => (
  <>
    <h1>Confirm Transaction</h1>
    <WalletLogo wallet={walletName} />
    <TransactionMessage>
      Please confirm the transaction in your {getWalletName(walletName)} wallet
    </TransactionMessage>
  </>
);
