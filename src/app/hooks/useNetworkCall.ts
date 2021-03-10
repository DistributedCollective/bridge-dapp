import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBridgePage } from '../containers/BridgePage/selectors';
import { useCachedCallState } from './useCachedCallState';

export function useNetworkCall<
  T = string,
  Fn extends (...args: any[]) => any = any
>(fn: Fn, name: string, args: Parameters<Fn>, value: T, condition?: boolean) {
  const { blockNumber } = useSelector(selectBridgePage);

  const { item, set } = useCachedCallState([name, ...args]);
  const [state, setState] = useState({ value, loading: false });

  useEffect(() => {
    const val = item || { value, loading: false };
    setState(prevState => ({ ...prevState, ...val }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(item)]);

  useEffect(() => {
    if ((condition !== undefined && condition) || condition === undefined) {
      set({
        loading: item === undefined ? true : item.loading,
        value: item === undefined ? value : item.value,
      });
      fn(...args)
        .then(value => {
          set({ value, loading: false });
        })
        .catch(_ => {
          set({ value, loading: false });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(fn), JSON.stringify(args), condition, blockNumber]);

  return state;
}
