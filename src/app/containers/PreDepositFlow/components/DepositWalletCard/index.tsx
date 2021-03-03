import React, { useEffect } from 'react';
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Text, Tooltip } from '@blueprintjs/core';
import { PreDepositFlowState } from '../../types';
import { Card } from '../../../../components/Card';
import { DEFAULT_CHAIN, prettyTx } from '../../../../../utils/helpers';
import { Dispatch } from '@reduxjs/toolkit';
import { actions } from '../../slice';
import { useSelector } from 'react-redux';
import { selectBlockChainProvider } from '../../../BlockChainProvider/selectors';

interface Props {
  state: PreDepositFlowState;
  dispatch: Dispatch;
}

export function DepositWalletCard({ state, dispatch }: Props) {
  const { address, chainId } = useSelector(selectBlockChainProvider);
  useEffect(() => {
    if (!state.tx.txHash && state.hsitory.length) {
      const item = state.hsitory.find(
        item =>
          item.type === 'deposit' &&
          item.status === 'pending' &&
          state.rskAddress.toLowerCase() === item.web3adr.toLowerCase() &&
          state.depositAddress.toLowerCase() === item.btcadr.toLowerCase(),
      );

      if (item) {
        dispatch(
          actions.updateDepositTx({
            status: item.status,
            txHash: item.txHash,
            value: String(item.valueBtc / 1e8),
          }),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(state.hsitory), state.tx.txHash]);

  return (
    <Card theme="dark">
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-center">
          Send BTC pre-deposit for SOV Origin Pre-order
        </h2>

        {chainId !== DEFAULT_CHAIN &&
          address.toLowerCase() === state.rskAddress.toLowerCase() && (
            <div className="bg-red text-white font-semibold mb-12 p-6">
              You created deposit address while connected to different network
              than RSK. You can still deposit, but follow our discord
              announcements for instructions on how to change it to correct one.
            </div>
          )}

        {address && address.toLowerCase() !== state.rskAddress.toLowerCase() && (
          <div className="bg-red text-white font-semibold mb-12 p-6">
            Your connected wallet address (
            <Tooltip content={address} className="text-gold">
              {prettyTx(address)}
            </Tooltip>
            ) is different than SOV receiving wallet (
            <Tooltip content={state.rskAddress} className="text-gold">
              {prettyTx(state.rskAddress)}
            </Tooltip>
            ).
            <br /> Make sure{' '}
            <Tooltip content={state.rskAddress} className="text-gold">
              {prettyTx(state.rskAddress)}
            </Tooltip>{' '}
            address is owned by you before depositing.
          </div>
        )}

        {!address && address.toLowerCase() !== state.rskAddress.toLowerCase() && (
          <div className="bg-red text-white font-semibold mb-12 p-6">
            Your are not connected to your wallet - make sure that wallet
            <Tooltip content={state.rskAddress} className="text-gold">
              {prettyTx(state.rskAddress)}
            </Tooltip>{' '}
            address is owned by you before depositing.
          </div>
        )}

        <div className="w-full flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8 lg:justify-between lg:items-center">
          <div className="w-full lg:w-1/2">
            <div>
              <div className="mb-2 font-medium">Deposit limits:</div>
              <ol className="list-disc mb-8">
                <li className="font-bold mb-2">MIN: 0.001 BTC</li>
                <li className="font-bold">MAX: 0.100 BTC</li>
              </ol>
            </div>
            <div className="font-medium mb-2">Instructions</div>
            <ol className="font-light text-small list-disc">
              <li>Only send BTC to pre-deposit and reserve SOV</li>
              <li>Do not send more BTC than your MAX limit</li>
            </ol>
            <div className="text-small font-light mt-8">
              For support please join us on{' '}
              <a
                href="https://discord.com/invite/J22WS6z"
                className="text-gold hover:text-gold"
                target="_blank"
                rel="noreferrer noopener"
              >
                discord.com/invite/J22WS6z
              </a>
            </div>
          </div>
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center"
            style={{ maxWidth: 320 }}
          >
            <div className="w-full mb-6">
              <div className="mb-3 font-medium text-button">
                Send BTC to this address:
              </div>
              <div className="bg-truewhite w-full rounded">
                <QRCode
                  value={state.depositAddress}
                  renderAs="svg"
                  bgColor="white"
                  fgColor="black"
                  includeMargin={true}
                  size={250}
                  className="mx-auto"
                />
              </div>
            </div>

            <CopyToClipboard text={state.depositAddress} onCopy={() => {}}>
              <div className="w-full flex flex-row justify-between items-center bg-gray border border-lightdark text-white rounded px-3 py-2 select-all cursor-pointer">
                <Text ellipsize className="select-all block md:hidden">
                  {prettyTx(state.depositAddress, 8, 6)}
                </Text>
                <Text ellipsize className="select-all hidden md:block">
                  {state.depositAddress}
                </Text>
                <div className="ml-3">
                  <svg
                    id="content_copy-24px"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <path
                      id="Path_11"
                      data-name="Path 11"
                      d="M0,0H20V20H0Z"
                      fill="none"
                    />
                    <path
                      id="Path_12"
                      data-name="Path 12"
                      d="M13.053,1H3.579A1.613,1.613,0,0,0,2,2.636V14.091H3.579V2.636h9.474Zm2.368,3.273H6.737A1.613,1.613,0,0,0,5.158,5.909V17.364A1.613,1.613,0,0,0,6.737,19h8.684A1.613,1.613,0,0,0,17,17.364V5.909A1.613,1.613,0,0,0,15.421,4.273Zm0,13.091H6.737V5.909h8.684Z"
                      fill="#2274a5"
                    />
                  </svg>
                </div>
              </div>
            </CopyToClipboard>

            <div className="w-full">
              <div className="mt-16 font-medium text-button">
                SOV receiving RSK wallet:
              </div>
              <div className="mt-3 w-full flex flex-row justify-between items-center bg-gray border border-lightdark text-white rounded px-3 py-2 select-all cursor-pointer">
                <Text ellipsize className="select-all md:hidden">
                  {prettyTx(state.rskAddress, 10, 8)}
                </Text>
                <Text ellipsize className="select-all hidden md:block">
                  {state.rskAddress}
                </Text>
              </div>
              <div className="mt-3 text-small">
                SOV tokens are not distributed right away, please wait for our{' '}
                <a
                  href="https://discord.com/invite/J22WS6z"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-gold hover:text-gold"
                >
                  discord
                </a>{' '}
                announcement for actual date.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
