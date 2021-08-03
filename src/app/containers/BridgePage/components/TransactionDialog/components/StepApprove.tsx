import React from 'react';
import { TransactionMessage } from '../styled';
import { ICommonProps } from '../types';
import { getWalletName } from '../utils';
import { WalletLogo } from './WalletLogo';

export const StepApprove: React.FC<ICommonProps> = ({ walletName }) => (
  <>
    <h1>Approve Tokens</h1>
    <WalletLogo wallet={walletName} />
    <TransactionMessage>
      Please confirm the transaction in your {getWalletName(walletName)} wallet
    </TransactionMessage>
  </>
);
