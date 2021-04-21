import React, { useMemo } from 'react';
import { Nullable, Asset, NetworkType } from 'types';
import { AssetDictionary } from 'dictionaries/asset-dictionary';
import { AssetDetails } from 'models/AssetDetails';
import { Select } from '../Select';
import { Option } from '../Select/types';
import { renderItem, valueRenderer } from './renderers';

interface Props {
  value: Nullable<Asset> | undefined;
  onChange: (value: Asset, item: Option) => void;
  networkType: NetworkType;
  sideNetworkType: NetworkType;
  options: Asset[];
  placeholder?: React.ReactNode;
}

export function AssetSelect(props: Props) {
  const options = useMemo(() => {
    return props.options.map(item => {
      const asset = AssetDictionary.get(
        props.networkType,
        props.sideNetworkType,
        item,
      ) as AssetDetails;
      return {
        key: item,
        label: asset.getSymbol(props.networkType),
        data: asset.image,
      };
    });
  }, [props.options, props.networkType, props.sideNetworkType]);
  return (
    <Select
      value={props.value as any}
      onChange={(value, option) =>
        props.onChange((value as unknown) as Asset, option as any)
      }
      options={options as any}
      itemRenderer={renderItem}
      valueRenderer={valueRenderer}
    />
  );
}
