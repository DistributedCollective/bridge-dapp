import React, { useState } from 'react';
import { Classes, Overlay } from '@blueprintjs/core';
import { Dispatch } from '@reduxjs/toolkit';
import styles from './index.module.css';
import { Button } from '../../../../components/Button';
import { actions } from '../../slice';
import { PreDepositFlowState, RedeemStep } from '../../types';
import { network } from '../../../BlockChainProvider/network';
import { showError } from '../../../../../utils/toaster';
import { Input } from '../../../../components/Input';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  address: string;
  state: PreDepositFlowState;
  dispatch: Dispatch;
}

export function RedeemDialog(props: Props) {
  const [address, setAddress] = useState('');

  const handleSubmit = async () => {
    try {
      props.dispatch(actions.setRedeemStep(RedeemStep.LOADING));
      const signature = await network.sign(
        [
          'I dont want to receive SOV to:',
          props.address,
          'Refund my BTC to:',
          address,
        ].join('\n'),
        props.address,
      );
      props.dispatch(
        actions.userRedeem({
          address: props.address,
          signature: signature,
          message: address,
        }),
      );
    } catch (e) {
      props.dispatch(actions.setRedeemStep(RedeemStep.FORM));
      showError('Failed to sign message.');
      console.error(e);
    }
  };

  const handleContinue = () =>
    props.dispatch(actions.setRedeemStep(RedeemStep.FORM));

  return (
    <Overlay
      isOpen={props.isOpen}
      onClose={() => props.onClose()}
      className={Classes.OVERLAY_SCROLL_CONTAINER}
      hasBackdrop
      canOutsideClickClose
      canEscapeKeyClose
    >
      <div className="custom-dialog-container">
        <div className="custom-dialog font-family-montserrat">
          <div className={styles.container}>
            {props.state.redeemState === RedeemStep.MAIN && (
              <>
                <div className="mt-12 mb-24">
                  <p className="lead text-center font-semibold">
                    You are about to redeem your btc
                    <br /> - meaning -<br /> you will NOT receive SOV
                  </p>
                </div>
                <Buttons
                  text="Continue"
                  onNext={handleContinue}
                  onClose={props.onClose}
                />
              </>
            )}
            {[RedeemStep.FORM, RedeemStep.LOADING].includes(
              props.state.redeemState,
            ) && (
              <>
                <div className="lg:px-8">
                  <h2 className="text-center">Redeem BTC</h2>

                  <div>
                    <p className="font-medium mb-2">Pre-order deposit:</p>
                  </div>
                  <div className="border border-bordergray rounded px-3 py-2 font-medium mb-5 font-semibold flex flex-row items-center justify-between space-x-4">
                    <div className="flex-grow-0 flex-shrink-0">
                      <span className="text-black">BTC</span>
                    </div>
                    <div className="flex-grow text-center">
                      {props.balance.toLocaleString(undefined, {
                        minimumFractionDigits: 4,
                        maximumFractionDigits: 4,
                      })}
                    </div>
                    <div className="flex-grow-0 flex-shrink-0">BTC</div>
                  </div>

                  <div className="my-8">
                    <svg
                      className="mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      width="38.776"
                      height="38.483"
                      viewBox="0 0 38.776 38.483"
                    >
                      <path
                        id="Path_2946"
                        data-name="Path 2946"
                        d="M99.026,15.924,88.13,5v8.193H68.986v5.462H88.13v8.193Z"
                        transform="translate(35.312 -65.486) rotate(90)"
                        fill="#e9eae9"
                        stroke="#e9eae9"
                        strokeWidth="7"
                      />
                    </svg>
                  </div>

                  <Input
                    label="Enter BTC address"
                    value={address}
                    onChange={value => setAddress(value)}
                  />

                  <p className="text-small mt-4">Tx Fee: 0.0006 BTC</p>
                </div>

                <Buttons
                  text="Confirm"
                  onNext={handleSubmit}
                  onClose={props.onClose}
                  loading={props.state.redeemState === RedeemStep.LOADING}
                />
              </>
            )}
            {props.state.redeemState === RedeemStep.COMPLETED && (
              <>
                <div className="mt-12 mb-24">
                  <p className="lead text-center font-semibold">
                    Your transaction has been batched, and will be processed
                    shortly
                  </p>
                </div>
                <Button
                  text="Close"
                  className="mx-auto mt-8 w-full border border-gold bg-gold rounded-xl hover:bg-opacity-75 bg-opacity-100 text-black font-extrabold uppercase"
                  onClick={props.onClose}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </Overlay>
  );
}

function Buttons({
  text,
  loading,
  onNext,
  onClose,
}: {
  text: string;
  loading?: boolean;
  onNext: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="mt-8 flex flex-row items-center justify-between space-x-6 w-full">
        <div className="w-1/2">
          <Button
            text={text}
            className="w-full border border-gold bg-gold rounded-xl hover:bg-opacity-75 bg-opacity-100 text-black font-extrabold uppercase"
            onClick={onNext}
            loading={loading}
          />
        </div>
        <div className="w-1/2">
          <Button
            text="Cancel"
            className="w-full border border-gold rounded-xl bg-gold bg-opacity-5 text-gold hover:bg-opacity-25 font-extrabold uppercase"
            onClick={onClose}
          />
        </div>
      </div>
    </>
  );
}
