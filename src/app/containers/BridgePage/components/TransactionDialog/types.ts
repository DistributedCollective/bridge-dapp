import { TxState } from '../../types';
import { NetworkType } from '../../../../../types';

export interface ITxProps {
  tx: TxState;
  network: NetworkType;
}

export interface ICommonProps {
  walletName: string;
}
