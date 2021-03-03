import React, { useCallback, useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { Checkbox } from '@blueprintjs/core';
import { Card } from '../../../../components/Card';
import { Button } from '../../../../components/Button';
import { actions } from '../../slice';

interface Props {
  dispatch: Dispatch;
}

export function NoticeCard({ dispatch }: Props) {
  const [checked, setChecked] = useState(false);
  const handleSubmit = useCallback(() => {
    dispatch(actions.acceptNotice());
  }, [dispatch]);
  return (
    <Card>
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-center">
          Important information about the Origin pre-deposit process
          <br />
          Please read carefully!
        </h2>

        <div className="mb-12 w-full flex flex-col lg:flex-row lg:justify-between lg:items-start lg:space-x-16">
          <div className="w-full mb-6 lg:w-1/2 lg:mb-0">
            <ul className="list-disc">
              <li className="text-small mb-6">
                Welcome to the Origin pre-deposit page. Here, you will be able
                to pre-deposit funds that will be allocated to the Origin
                pre-order. Details on the Origin pre-order can be found in
                SIP-0006, which can be found{' '}
                <a
                  href="https://docs.google.com/document/d/1FRa586FIxJNa9h8pj5WblKd62u_mEUHCjvFjBp0b71o/edit"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-gold no-underline hover:text-gold hover:underline"
                >
                  here
                </a>
                .
              </li>
              <li className="text-small">
                Any participant in the Origin pre-order is entitled to a MAXIMUM
                contribution of 0.1 BTC. Once the Origin pre-order is concluded,
                your pre-deposit will be applied and converted to SOV at the
                closing price of the Origin pre-order, subject to SIP-006
                approval.
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/2">
            <ul className="list-disc">
              <li className="text-small mb-6">
                The closing price of the Origin pre-order will be determined at
                the conclusion of the auction process, as described in SIP-0006.
                According to the auction model outlined in SIP-0006 the price
                per SOV will close anywhere between 3,000 -10,000 sats per SOV.
                By pre-depositing your BTC, you accept that the conversion price
                to SOV may fall anywhere in this range!
              </li>
              <li className="text-small">
                If you deposit an amount higher than 0.1 BTC, you accept and
                confirm that the excess amount will not be refunded and will not
                be converted to SOV! Any excess amount will be considered as a
                charitable donation to the Sovryn protocol.
              </li>
            </ul>
          </div>
        </div>

        <p className="lead mb-2 font-medium">
          Please do not deposit an amount higher than 0.1 BTC!
        </p>

        <p className="text-small mb-8" style={{ maxWidth: 595 }}>
          DON’T DEPOSIT MORE THAN YOU CAN AFFORD TO LOSE. BTC is the most
          valuable asset in the world. Sovryn is a risky, early stage project.
          By participating, you are placing your BTC at risk.{' '}
        </p>

        <div className="mb-8">
          <Checkbox
            label="I have read and understand that I am responsible for my own Sovrynity"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
        </div>

        <Button
          text="I Understand"
          type="button"
          disabled={!checked}
          onClick={handleSubmit}
        />
      </div>
    </Card>
  );
}
