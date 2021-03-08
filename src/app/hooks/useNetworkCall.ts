import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBridgePage } from '../containers/BridgePage/selectors';

export function useNetworkCall<
  T = string,
  Fn extends (...args: any[]) => any = any
>(fn: Fn, args: Parameters<Fn>, value: T, condition?: boolean) {
  const { blockNumber } = useSelector(selectBridgePage);
  const [state, setState] = useState<{ value: T; loading: boolean }>({
    value: value,
    loading: true,
  });

  useEffect(() => {
    if ((condition !== undefined && condition) || condition === undefined) {
      setState(prevState => ({ ...prevState, loading: true }));
      fn(...args)
        .then(value => {
          setState(prevState => ({ ...prevState, value, loading: false }));
        })
        .catch(e => {
          setState(prevState => ({
            ...prevState,
            value: value,
            loading: false,
          }));
        });
    } else {
      setState(prevState => ({ ...prevState, value: value, loading: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(fn), JSON.stringify(args), condition, blockNumber]);

  return state;
}
