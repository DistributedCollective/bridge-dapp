import React, { useState } from 'react';
import { Classes, Overlay } from '@blueprintjs/core';
import styles from './index.module.css';
import { Button } from '../../../../components/Button';
import { actions } from '../../slice';
import { AddressStep } from '../../types';
import { showError } from '../../../../../utils/toaster';
import { Input } from '../../../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { selectPreDepositFlow } from '../../selectors';
import { selectBlockChainProvider } from '../../../BlockChainProvider/selectors';
import { network } from '../../../BlockChainProvider/network';

export function AddressChangeDialog() {
  const { address, connected } = useSelector(selectBlockChainProvider);
  const { addressState } = useSelector(selectPreDepositFlow);
  const dispatch = useDispatch();

  const [rskAddress, setRskAddress] = useState('');

  const handleSubmit = async () => {
    try {
      dispatch(actions.setAddressStep(AddressStep.LOADING));
      const timestamp = new Date().getTime();
      const signature = await network.sign(
        [
          'Change address from:',
          address,
          'To:',
          rskAddress,
          'Timestamp:',
          timestamp,
        ].join('\n'),
        address,
      );
      dispatch(
        actions.userChangeAddress({
          currentAddress: address,
          newAddress: rskAddress,
          timestamp,
          signature,
        }),
      );
    } catch (e) {
      showError('Failed to sign message.');
      console.error(e);
    }
  };

  return (
    <Overlay
      isOpen={addressState !== AddressStep.NONE}
      onClose={() => dispatch(actions.setAddressStep(AddressStep.NONE))}
      className={Classes.OVERLAY_SCROLL_CONTAINER}
      hasBackdrop
      canOutsideClickClose
      canEscapeKeyClose
    >
      <div className="custom-dialog-container">
        <div className="custom-dialog font-family-montserrat">
          <div className={styles.container}>
            {[AddressStep.MAIN, AddressStep.LOADING].includes(addressState) && (
              <>
                <div className="mt-8 mb-24">
                  <p className="lead text-center font-semibold mb-8">
                    Change SOV Wallet
                  </p>
                  <p>
                    In case you generated BTC deposit wallet for using wrong RSK
                    wallet or even using from network (chain) you can change it
                    here in these simple steps:
                  </p>
                  <div className="pl-4 mt-8 mb-12">
                    <ol className="list-decimal">
                      <li className="mb-2">
                        Get your <strong>correct</strong> RSK wallet address
                        ready, copy it to clipboard.
                      </li>
                      <li className="mb-2">
                        Switch to network of your <strong>current</strong>{' '}
                        wallet.
                      </li>
                      <li className="mb-2">
                        Switch to <strong>current</strong> wallet.
                      </li>
                      <li className="mb-2">
                        Enter address of your <strong>correct</strong> RSK
                        wallet to the input field below.
                      </li>
                      <li className="mb-2">
                        Click <strong>Sign & Submit</strong> and follow your
                        wallet's instructions to sign message.
                      </li>
                      <li className="mb-2">Your wallet now are changed!</li>
                    </ol>

                    <p className="mt-5 text-small font-medium">
                      Note: Make sure your <strong>correct</strong> wallet is
                      indeed <strong>correct</strong> wallet you own and have
                      access to it, otherwise you will loose your funds.
                    </p>
                  </div>

                  <div className="lg:px-8">
                    <Input
                      label={
                        <>
                          Enter Your <strong>Correct</strong> RSK wallet address
                        </>
                      }
                      value={rskAddress}
                      onChange={value => setRskAddress(value)}
                    />
                  </div>
                </div>
                <div className="mt-8 flex flex-row items-center justify-between space-x-6 w-full">
                  <div className="w-1/2">
                    <Button
                      text="Sign & Submit"
                      className="w-full border border-gold bg-gold rounded-xl hover:bg-opacity-75 bg-opacity-100 text-black font-extrabold uppercase"
                      onClick={handleSubmit}
                      loading={addressState === AddressStep.LOADING}
                      disabled={
                        rskAddress.length !== 42 || !address || !connected
                      }
                    />
                  </div>
                  <div className="w-1/2">
                    <Button
                      text="Cancel"
                      className="w-full border border-gold rounded-xl bg-gold bg-opacity-5 text-gold hover:bg-opacity-25 font-extrabold uppercase"
                      onClick={() =>
                        dispatch(actions.setAddressStep(AddressStep.NONE))
                      }
                    />
                  </div>
                </div>
              </>
            )}
            {addressState === AddressStep.COMPLETED && (
              <>
                <div className="mt-12 mb-24">
                  <p className="lead text-center font-semibold">
                    Your RSK address was successfully changed!
                  </p>
                </div>
                <Button
                  text="Close"
                  className="mx-auto mt-8 w-full border border-gold bg-gold rounded-xl hover:bg-opacity-75 bg-opacity-100 text-black font-extrabold uppercase"
                  onClick={() =>
                    dispatch(actions.setAddressStep(AddressStep.NONE))
                  }
                />
              </>
            )}
          </div>
        </div>
      </div>
    </Overlay>
  );
}
