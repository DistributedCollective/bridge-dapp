import { useCallback, useEffect, useMemo } from 'react';
import { createState, useState } from '@hookstate/core/dist';
import Web3 from 'web3';
import { debug } from 'utils/debug';

const { log } = debug('useCachedCallState');
const web3 = new Web3();

interface CallValue<T = any> {
  value: T;
  loading: boolean;
}

interface CacheState {
  items: { [key: string]: CallValue };
}

const globalState = createState<CacheState>({
  items: {},
});

export function useCachedCallState(args: any[]) {
  const key = useMemo(() => {
    return web3.utils.sha3(args.join('')) as string;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(args)]);

  const { items } = useState(globalState);

  const set = useCallback(
    (value: CallValue) => {
      items.merge({ [key]: value });
    },
    [items, key],
  );

  useEffect(() => {
    log(args, web3.utils.sha3(args.join('')) as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(args)]);

  return {
    key,
    item: items.nested(key).value,
    set,
  };
}
