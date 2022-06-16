import React from 'react';
import { ITxProps } from '../types';
import { TransactionBadge } from '../../../../../components/TransactionBadge';
import { TxStep } from 'app/containers/BridgePage/types';

type StepConfirmedProps = ITxProps & { step: TxStep };

export const StepConfirmed: React.FC<StepConfirmedProps> = ({
  tx,
  network,
  step,
}) => (
  <>
    <h1>
      {step === TxStep.COMPLETED_TRANSFER
        ? 'Transaction confirmed'
        : 'Transaction pending'}
    </h1>
    <p className="lead">
      {step === TxStep.COMPLETED_TRANSFER
        ? 'Your transaction confirmed.'
        : 'Your transaction pending.'}
    </p>
    <div className="mt-12 text-center">
      <TransactionBadge transactionHash={tx.hash} networkType={network} />
    </div>
    <div className="mt-12 text-center text-xs opacity-75">
      After the transaction is confirmed, it will take up to 20 minutes for
      assets to be moved between the chains. Please be patient.
    </div>
  </>
);
