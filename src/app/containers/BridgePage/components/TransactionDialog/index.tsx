import React from 'react';
import { Dialog } from 'app/components/Form/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { selectBridgePage } from '../../selectors';
import { TxState, TxStep } from '../../types';
import { actions } from '../../slice';
import { Spinner } from '@blueprintjs/core';
import { Asset, NetworkType } from '../../../../../types';
import { AssetDictionary } from '../../../../../dictionaries';
import { TransactionBadge } from '../../../../components/TransactionBadge';
import { useBridgeState } from '../../../../hooks/useBridgeState';

export function TransactionDialog() {
  const { tx, networkType } = useSelector(selectBridgePage);
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
      {tx.step === TxStep.PENDING_TRANSFER && (
        <StepPending tx={tx} network={networkType} />
      )}
      {tx.step === TxStep.COMPLETED_TRANSFER && (
        <StepConfirmed tx={tx} network={networkType} />
      )}
      {tx.step === TxStep.FAILED_TRANSFER && (
        <StepFailed tx={tx} network={networkType} />
      )}
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
  network: NetworkType;
}

function StepApprove({
  asset,
  network,
}: {
  asset: Asset;
  network: NetworkType;
}) {
  const { targetNetwork } = useBridgeState();
  const symbol = AssetDictionary.getSymbol(network, targetNetwork.value, asset);
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

function StepPending({ tx, network }: TxProps) {
  return (
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
}

function StepConfirmed({ tx, network }: TxProps) {
  return (
    <>
      <h1>Transaction confirmed</h1>
      <p className="lead">Your transaction confirmed.</p>
      <div className="mt-12 text-center">
        <TransactionBadge transactionHash={tx.hash} networkType={network} />
      </div>
      <div className="mt-12 text-center text-xs opacity-75">
        After the transaction is confirmed, it will take up to 20 minutes for
        assets to be moved between the chains. Please be patient.
      </div>
    </>
  );
}

function StepFailed({ tx, network }: TxProps) {
  return (
    <>
      <h1>Transaction failed</h1>
      <p className="lead">Your transaction failed.</p>{' '}
      <div className="mt-12 text-center">
        <TransactionBadge transactionHash={tx.hash} networkType={network} />
      </div>
    </>
  );
}
