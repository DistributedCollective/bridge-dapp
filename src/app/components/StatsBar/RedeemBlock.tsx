import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import redeemable from 'utils/redeemable.json';
import { actions } from 'app/containers/PreDepositFlow/slice';
import { selectBlockChainProvider } from '../../containers/BlockChainProvider/selectors';
import { PreDepositFlowState } from '../../containers/PreDepositFlow/types';

export function RedeemBlock({
  state,
  dispatch,
}: {
  state: PreDepositFlowState;
  dispatch: Dispatch;
}) {
  const { address, connected } = useSelector(selectBlockChainProvider);
  const [balance1, setBalance1] = useState(0);
  const [balance2, setBalance2] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let timer;
    if (state.ready && address) {
      dispatch(actions.getDepositHistory(address));
      timer = setInterval(() => {
        dispatch(actions.getDepositHistory(address));
      }, 120e3);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [dispatch, state.ready, address]);

  useEffect(() => {
    const search = redeemable.filter(
      item => item.rsk.toLowerCase() === address.toLowerCase(),
    );
    const amount = search.reduce((a, b) => a + b.amount, 0);
    setBalance1(amount);
  }, [address, state.depositAddress, state.rskAddress]);

  useEffect(() => {
    setBalance2(
      state.hsitory
        .filter(item => item.type === 'deposit')
        .reduce((a, b) => a + b.valueBtc, 0) / 1e8,
    );
  }, [state.hsitory]);

  useEffect(() => {
    setTotal(balance1 + balance2);
  }, [balance1, balance2]);

  if (address && connected) {
    return (
      <>
        <div className="px-3 flex flex-row justify-between items-center space-x-16">
          <div>
            <div className="font-light text-small">Your BTC Deposit:</div>
            <div className="mt-1 font-medium">
              {total.toLocaleString(undefined, {
                minimumFractionDigits: 4,
                maximumFractionDigits: 4,
              })}{' '}
              BTC
            </div>
          </div>
        </div>
      </>
    );
  }
  return <></>;
}
