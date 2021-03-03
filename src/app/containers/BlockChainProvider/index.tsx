/**
 *
 * BlockChainProvider
 *
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectBlockChainProvider } from './selectors';
import { blockChainProviderSaga } from './saga';
import { PageSkeleton } from '../../components/PageSkeleton';
import { DEFAULT_CHAIN } from '../../../utils/helpers';

interface Props {
  children: React.ReactNode;
}

export function BlockChainProvider(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: blockChainProviderSaga });

  const blockChainProvider = useSelector(selectBlockChainProvider);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setup(DEFAULT_CHAIN));
  }, [dispatch]);

  if (!blockChainProvider.setupCompleted) {
    return <PageSkeleton />;
  }

  return <>{props.children}</>;
}
