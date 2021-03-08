import React from 'react';
import { Dialog } from 'app/components/Form/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { selectBridgePage } from '../../selectors';
import { TxState, TxStep } from '../../types';
import { actions } from '../../slice';
import { Spinner } from '@blueprintjs/core';
import { Asset, NetworkType } from '../../../../../types';
import { AssetDictionary } from '../../../../../dictionaries';
import { AssetDetails } from '../../../../../models/AssetDetails';
import { prettyTx } from '../../../../../utils/helpers';

export function TransactionDialog() {
  const { tx } = useSelector(selectBridgePage);
  const dispatch = useDispatch();
  return (
    <Dialog
      isOpen={tx.step !== TxStep.NONE}
      onClose={() => dispatch(actions.closeTransfer())}
    >
      {tx.step === TxStep.MAIN && <StepMain />}
      {tx.step === TxStep.APPROVE && (
        <StepApprove
          network={tx.payload.sourceNetwork}
          asset={tx.payload.asset}
        />
      )}
      {tx.step === TxStep.CONFIRM_TRANSFER && <StepConfirm />}
      {tx.step === TxStep.PENDING_TRANSFER && <StepPending tx={tx} />}
      {tx.step === TxStep.COMPLETED_TRANSFER && <StepConfirmed tx={tx} />}
      {tx.step === TxStep.FAILED_TRANSFER && <StepFailed tx={tx} />}
      {tx.step === TxStep.USER_DENIED && <StepUserDenied />}
    </Dialog>
  );
}

function StepMain() {
  return (
    <>
      <Spinner size={96} />
    </>
  );
}

interface TxProps {
  tx: TxState;
}

function StepApprove({
  asset,
  network,
}: {
  asset: Asset;
  network: NetworkType;
}) {
  const { symbol } = AssetDictionary.get(network, asset) as AssetDetails;
  return (
    <>
      <h1>Confirm in your browser wallet</h1>
      <p className="lead">
        Please approve {symbol} tokens to be spent from the sovryn smart
        contract in your browser wallet.
      </p>
    </>
  );
}

function StepUserDenied() {
  return (
    <>
      <h1>Transaction aborted</h1>
      <p className="lead">User denied transaction signature.</p>
    </>
  );
}

function StepConfirm() {
  return (
    <>
      <h1>Confirm in your browser wallet</h1>
      <p className="lead">Please confirm transfer in your browser wallet.</p>
    </>
  );
}

function StepPending({ tx }: TxProps) {
  return (
    <>
      <h1>Transaction pending</h1>
      <p className="lead">Your transaction pending.</p>
      <p>{prettyTx(tx.hash)}</p>
    </>
  );
}

function StepConfirmed({ tx }: TxProps) {
  return (
    <>
      <h1>Transaction confirmed</h1>
      <p className="lead">Your transaction confirmed.</p>
      <p>{prettyTx(tx.hash)}</p>
    </>
  );
}

function StepFailed({ tx }: TxProps) {
  return (
    <>
      <h1>Transaction failed</h1>
      <p className="lead">Your transaction failed.</p>
      <p>{prettyTx(tx.hash)}</p>
    </>
  );
}
