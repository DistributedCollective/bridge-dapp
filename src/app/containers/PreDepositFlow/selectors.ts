import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.preDepositFlow || initialState;

export const selectPreDepositFlow = createSelector(
  [selectDomain],
  preDepositFlowState => preDepositFlowState,
);
