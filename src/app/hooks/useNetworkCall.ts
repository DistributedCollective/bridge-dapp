import { useEffect, useState } from 'react';

export function useNetworkCall<
  T = string,
  Fn extends (...args: any[]) => any = any
>(fn: Fn, args: Parameters<Fn>, value: T, condition?: boolean) {
  const [state, setState] = useState<{ value: T; loading: boolean }>({
    value: value,
    loading: true,
  });

  useEffect(() => {
    console.log(fn.name, args, condition);
    if ((condition !== undefined && condition) || condition === undefined) {
      setState(prevState => ({ ...prevState, loading: true }));
      fn(...args)
        .then(value => {
          console.log(fn.name, args, value);
          setState(prevState => ({ ...prevState, value, loading: false }));
        })
        .catch(e => {
          console.error(fn.name, args, e);
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
  }, [JSON.stringify(fn), JSON.stringify(args), condition]);

  return state;
}
