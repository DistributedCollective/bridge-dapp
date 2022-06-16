import React from 'react';
import { getWalletName } from '../utils';
import { TransactionMessage } from '../styled';
import { ICommonProps } from '../types';
import { WalletLogo } from './WalletLogo';
import { TxStep } from 'app/containers/BridgePage/types';

type StepConfirmProps = ICommonProps & { step: TxStep };

export const StepConfirm: React.FC<StepConfirmProps> = ({
  walletName,
  step,
}) => (
  <>
    <h1>
      {step === TxStep.APPROVE ? 'Approve Tokens' : 'Confirm Transaction'}
    </h1>
    <WalletLogo wallet={walletName} />
    <TransactionMessage>
      Please confirm the transaction in your {getWalletName(walletName)} wallet
    </TransactionMessage>
  </>
);
