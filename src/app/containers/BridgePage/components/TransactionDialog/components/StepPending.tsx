import React from 'react';
import { ITxProps } from '../types';
import { TransactionBadge } from '../../../../../components/TransactionBadge';

export const StepPending: React.FC<ITxProps> = ({ tx, network }) => (
  <>
    <h1>Transaction pending</h1>
    <p className="lead">Your transaction pending.</p>
    <div className="mt-12 text-center">
      <TransactionBadge transactionHash={tx.hash} networkType={network} />
    </div>
    <div className="mt-12 text-center text-xs opacity-75">
      After the transaction is confirmed, it will take up to 20 minutes for
      assets to be moved between the chains. Please be patient.
    </div>
  </>
);
