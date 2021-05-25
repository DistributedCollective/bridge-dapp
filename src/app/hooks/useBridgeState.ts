import { useEffect, useMemo } from 'react';
import { createState, useState } from '@hookstate/core/dist';
import { Asset, NetworkType } from 'types';
import { bridge } from 'services/interactions/bridge';
import { useNetworkCall } from './useNetworkCall';
import debug from 'utils/debug';
import { AssetDictionary } from '../../dictionaries';

const { log } = debug('useBridgeState');

interface CallValue<T = string> {
  value: T;
  loading: boolean;
}

interface BridgeState {
  fee: CallValue<number>;
  min: CallValue<number>;
  max: CallValue<number>;
  daily: CallValue<number>;
  sourceNetwork: NetworkType;
  targetNetwork: NetworkType;
  asset: Asset;
  amount: string;
  receiver: string;
}

const globalBridgeState = createState<BridgeState>({
  fee: createValue(0),
  min: createValue(0),
  max: createValue(0),
  daily: createValue(0),
  sourceNetwork: NetworkType.ETH,
  targetNetwork: NetworkType.RSK,
  asset: Asset.ETH,
  amount: '0.01',
  receiver: '',
});

export function useBridgeState() {
  return useState(globalBridgeState);
}

export function useBuildBridgeState(
  sourceNetwork: NetworkType,
  targetNetwork: NetworkType,
  asset: Asset,
  amount: string,
) {
  const state = useState(globalBridgeState);

  useEffect(() => {
    state.sourceNetwork.set(sourceNetwork);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceNetwork]);

  useEffect(() => {
    state.targetNetwork.set(targetNetwork);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceNetwork]);

  useEffect(() => {
    state.asset.set(asset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asset]);

  useEffect(() => {
    state.amount.set(amount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  const min = useNetworkCall(
    bridge.allowTokens_getMinPerToken.bind(bridge),
    'bridge_allowTokens_min_token',
    [state.sourceNetwork.get(), state.targetNetwork.get(), state.asset.get()],
    0,
    !!state.sourceNetwork.get(),
  );
  const max = useNetworkCall(
    bridge.allowTokens_getMax.bind(bridge),
    'bridge_allowTokens_max',
    [state.sourceNetwork.get(), state.targetNetwork.get()],
    0,
    !!state.sourceNetwork.get(),
  );
  const fee = useNetworkCall(
    bridge.getFeePerToken.bind(bridge),
    'bridge_token_fee',
    [state.sourceNetwork.get(), state.targetNetwork.get(), state.asset.get()],
    0,
    !!state.sourceNetwork.get(),
  );
  const daily = useNetworkCall(
    bridge.allowTokens_getDailyLimit.bind(bridge),
    'bridge_allowTokens_daily',
    [state.sourceNetwork.get(), state.targetNetwork.get()],
    0,
    !!state.sourceNetwork.get(),
  );

  const limits = useMemo(() => {
    return getAssetLimit(
      state.sourceNetwork.value,
      state.targetNetwork.value,
      state.asset.value,
    );
  }, [state.sourceNetwork.value, state.targetNetwork.value, state.asset.value]);

  useEffect(() => {
    log('get bridge min', min.value, limits.min);
    state
      .nested('min')
      .nested('value')
      .set(fallbackValue(limits.min, min.value));
    state.nested('min').nested('loading').set(min.loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, limits.min]);

  useEffect(() => {
    log('get bridge max', max.value, limits.max);
    state
      .nested('max')
      .nested('value')
      .set(fallbackValue(limits.max, max.value));
    state.nested('max').nested('loading').set(max.loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [max, limits.max]);

  useEffect(() => {
    log('get bridge fee', fee.value, limits.fee);
    state
      .nested('fee')
      .nested('value')
      .set(fallbackValue(limits.fee, fee.value));
    state.nested('fee').nested('loading').set(fee.loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fee, limits.fee]);

  useEffect(() => {
    log('get bridge daily', daily.value, limits.daily);
    state
      .nested('daily')
      .nested('value')
      .set(fallbackValue(limits.daily, daily.value));
    state.nested('daily').nested('loading').set(daily.loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daily, limits.daily]);

  return state;
}

function createValue<T = string>(value: T, loading: boolean = false) {
  return {
    value,
    loading,
  };
}

function getAssetLimit(
  sourceNetwork: NetworkType,
  targetNetwork: NetworkType,
  asset: Asset,
) {
  const limits = AssetDictionary.getLimits(sourceNetwork, targetNetwork, asset);
  if (limits === undefined) {
    return {
      min: undefined,
      max: undefined,
      fee: undefined,
      daily: undefined,
    };
  }
  return limits;
}

function fallbackValue(value: any, fallback: any): any {
  if (value !== undefined) return value;
  return fallback;
}
