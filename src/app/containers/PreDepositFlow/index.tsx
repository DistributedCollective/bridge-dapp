/**
 *
 * PreDepositFlow
 *
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectPreDepositFlow } from './selectors';
import { preDepositFlowSaga } from './saga';
import { Step } from './types';
import { MainCard } from './components/MainCard';
import { LoaderCard } from './components/LoaderCard';
import { WaitListCard } from './components/WaitListCard';
import { NoticeCard } from './components/NoticeCard';
import { DepositPendingCard } from './components/DepositPendingCard';
import { DepositWalletCard } from './components/DepositWalletCard';
import { ConnectCard } from './components/ConnectCard';
import { StatsBar } from '../../components/StatsBar';

interface Props {}

export function PreDepositFlow(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: preDepositFlowSaga });

  const state = useSelector(selectPreDepositFlow);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.init());
  }, [dispatch]);

  useEffect(() => {
    let timer;
    if (state.ready) {
      dispatch(actions.getTotalDeposits());
      timer = setInterval(() => {
        dispatch(actions.getTotalDeposits());
      }, 10000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [dispatch, state.ready]);

  return (
    <>
      <StatsBar state={state} dispatch={dispatch} />
      <div className="pb-16">
        <StepRenderer state={state} dispatch={dispatch} />
      </div>
    </>
  );
}

function StepRenderer({ state, dispatch }) {
  switch (state.step) {
    case Step.MAIN:
      return <MainCard state={state} dispatch={dispatch} />;
    case Step.LOADER:
      return <LoaderCard />;
    case Step.WAITLIST:
      return <WaitListCard />;
    case Step.NOTICE:
      return <NoticeCard dispatch={dispatch} />;
    case Step.CONNECT:
      return <ConnectCard dispatch={dispatch} />;
    case Step.DEPOSIT_WALLET:
      return <DepositWalletCard state={state} dispatch={dispatch} />;
    case Step.DEPOSIT_PENDING:
      return <DepositPendingCard state={state} />;
    default:
      return <p>Something went wrong.</p>;
  }
}
