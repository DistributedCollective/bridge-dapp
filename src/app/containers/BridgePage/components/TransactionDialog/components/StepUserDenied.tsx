import React from 'react';
import { TransactionMessage } from '../styled';
import { ICommonProps } from '../types';
import { WalletLogo } from './WalletLogo';

export const StepUserDenied: React.FC<ICommonProps> = ({ walletName }) => (
  <>
    <h1>Transaction aborted</h1>
    <WalletLogo wallet={walletName} />
    <TransactionMessage>User denied transaction signature.</TransactionMessage>
  </>
);
