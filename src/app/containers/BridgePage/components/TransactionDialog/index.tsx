import React, { useMemo } from 'react';
import { Dialog } from 'app/components/Form/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { selectBridgePage } from '../../selectors';
import { TxStep } from '../../types';
import { actions } from '../../slice';
import { detectWeb3Wallet } from 'utils/helpers';
import { wallet } from 'services/wallet';
import { StepMain } from './components/StepMain';
import { StepUserDenied } from './components/StepUserDenied';
import { StepConfirm } from './components/StepConfirm';
import { StepConfirmed } from './components/StepConfirmed';
import { StepFailed } from './components/StepFailed';

export const TransactionDialog: React.FC = () => {
  const { tx, networkType } = useSelector(selectBridgePage);
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const walletName = useMemo(() => detectWeb3Wallet(), [wallet.address]);

  return (
    <Dialog
      isOpen={tx.step !== TxStep.NONE}
      onClose={() => dispatch(actions.closeTransfer())}
    >
      {tx.step === TxStep.MAIN && <StepMain />}
      {[TxStep.APPROVE, TxStep.CONFIRM_TRANSFER].includes(tx.step) && (
        <StepConfirm walletName={walletName} step={tx.step} />
      )}
      {[TxStep.COMPLETED_TRANSFER, TxStep.PENDING_TRANSFER].includes(
        tx.step,
      ) && <StepConfirmed tx={tx} network={networkType} step={tx.step} />}
      {tx.step === TxStep.FAILED_TRANSFER && (
        <StepFailed tx={tx} network={networkType} />
      )}
      {tx.step === TxStep.USER_DENIED && (
        <StepUserDenied walletName={walletName} />
      )}
    </Dialog>
  );
};
