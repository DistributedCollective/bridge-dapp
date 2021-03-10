import React, { useMemo } from 'react';
import { NetworkType } from '../../../types';
import { NetworkDictionary } from '../../../dictionaries';
import { prettyTx } from '../../../utils/helpers';

interface Props {
  transactionHash: string;
  networkType: NetworkType;
  className?: string;
}

export function TransactionBadge(props: Props) {
  const url = useMemo(() => {
    return NetworkDictionary.get(props.networkType).explorerTx.replace(
      ':value',
      props.transactionHash,
    );
  }, [props]);

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className={props.className}
    >
      {prettyTx(props.transactionHash)}
    </a>
  );
}
