import React, { useCallback, useEffect, useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { PreDepositFlowState } from '../../containers/PreDepositFlow/types';
import { RedeemBlock } from './RedeemBlock';

const btcAllocation = 200;

export function StatsBar({
  state,
  dispatch,
}: {
  state: PreDepositFlowState;
  dispatch: Dispatch;
}) {
  const calculatePercent = useCallback(
    (remaining: number) => {
      if (remaining <= 0) {
        return 0;
      } else if (remaining >= btcAllocation) {
        return 100;
      } else {
        return (remaining / btcAllocation) * 100;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [btcAllocation],
  );

  const [remainingBTC, setRemainingBTC] = useState(
    btcAllocation - state.totalDeposits / 1e8,
  );
  const [remainingPercent, setRemainingPercent] = useState(
    calculatePercent(btcAllocation - state.totalDeposits / 1e8),
  );

  useEffect(() => {
    const balance = btcAllocation - state.totalDeposits / 1e8;
    setRemainingBTC(balance);
    setRemainingPercent(calculatePercent(balance));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.totalDeposits]);

  return (
    <div className="container mb-16">
      <article className="border-t border-b border-white py-4 flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <RedeemBlock state={state} dispatch={dispatch} />
        <div className="px-3">
          <div className="font-light text-small">
            Origin Pre-order allocation:
          </div>
          <div className="mt-1 font-medium">{(2000000).toLocaleString()}</div>
        </div>
        <div className="px-3">
          <div className="font-semibold text-small text-gold">
            BTC Allocation Remaining:
          </div>
          <div className="mt-1 font-bold text-gold">
            {remainingPercent.toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
            % ≈{' '}
            {remainingBTC.toLocaleString(undefined, {
              maximumFractionDigits: 4,
              minimumFractionDigits: 4,
            })}{' '}
            BTC
          </div>
        </div>
        <div className="px-3">
          <div className="font-light text-small">Accepted currencies:</div>
          <div className="mt-1 font-medium">BTC</div>
        </div>
      </article>
    </div>
  );
}
