import React, { useMemo } from 'react';
import { NetworkType } from '../../../types';
import { NetworkDictionary } from '../../../dictionaries';
import { prettyTx } from '../../../utils/helpers';

interface Props {
  address: string;
  networkType: NetworkType;
}

export function IdentityBadge(props: Props) {
  const url = useMemo(() => {
    return NetworkDictionary.get(props.networkType).explorerAdr.replace(
      ':value',
      props.address,
    );
  }, [props]);

  return (
    <a href={url} target="_blank" rel="noreferrer noopener">
      {prettyTx(props.address)}
    </a>
  );
}
