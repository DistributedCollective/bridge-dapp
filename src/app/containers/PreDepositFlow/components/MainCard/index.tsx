import React, { useCallback, useState } from 'react';
import { Card } from '../../../../components/Card';
import { Input } from '../../../../components/Input';
import { Button } from '../../../../components/Button';
import { validateEmail } from '../../../../../utils/helpers';
import { Dispatch } from '@reduxjs/toolkit';
import { actions } from '../../slice';
import { PreDepositFlowState } from '../../types';

interface Props {
  state: PreDepositFlowState;
  dispatch: Dispatch;
}

export function MainCard({ dispatch, state }: Props) {
  const [email, setEmail] = useState(state.email);
  const handleSubmit = useCallback(
    e => {
      e.preventDefault && e.preventDefault();
      dispatch(actions.submitEmail(email));
    },
    [email, dispatch],
  );
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col items-center justify-center">
          <h2>Origin Pre-Deposits are now CLOSED</h2>
          <p className="lead text-center mb-24">
            The remaining allocation has been reserved for the Sovryn team to
            participate.
          </p>

          <div className="mb-12">
            <Input
              label="Enter Email:"
              type="email"
              value={email}
              onChange={value => setEmail(value)}
            />
          </div>

          <Button
            text="Submit"
            type="submit"
            disabled={!validateEmail(email)}
            loading={false}
          />
        </div>
      </form>
    </Card>
  );
}
