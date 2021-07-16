import React from 'react';
import { ITxProps } from '../types';
import { TransactionBadge } from '../../../../../components/TransactionBadge';

export const StepFailed: React.FC<ITxProps> = ({ tx, network }) => (
  <>
    <h1>Transaction failed</h1>
    <p className="lead">Your transaction failed.</p>{' '}
    <div className="mt-12 text-center">
      <TransactionBadge transactionHash={tx.hash} networkType={network} />
    </div>
  </>
);
