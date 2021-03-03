import { ChainId } from '../app/containers/BlockChainProvider/types';

export const DEFAULT_CHAIN = Number(
  Number(process.env.REACT_APP_CHAIN_ID) || 31,
) as ChainId;

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function prettyTx(
  text: string,
  startLength: number = 6,
  endLength: number = 4,
) {
  const start = text.substr(0, startLength);
  const end = text.substr(-endLength);
  return `${start} ··· ${end}`;
}
