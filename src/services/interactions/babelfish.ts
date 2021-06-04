import type { AbiItem } from 'web3-utils';
import type { Asset, NetworkType } from '../../types';
import { AssetDictionary } from '../../dictionaries';
import massetAbi from '../../assets/abi/BabelFish_MassetAbi.json';
import { network } from '../index';

class Babelfish {
  public mintTo(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
    asset: Asset,
    bAsset: string,
    bAssetQuanity: string,
    recipient: string,
  ) {
    throw new Error('Not implemented (babelfish mint).');
  }

  public redeemToBridge(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
    asset: Asset,
    bAsset: string,
    mAssetQuanity: string,
    recipient: string,
    bridge: string,
  ) {
    const { address, abi } = this.getMassetData(
      networkType,
      sideNetworkType,
      asset,
    );
    return network.send(networkType, address, abi, 'redeemToBridge', [
      bAsset,
      mAssetQuanity,
      recipient,
      bridge,
    ]);
  }

  private getMassetData(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
    asset: Asset,
  ): { address: string; abi: AbiItem[] } {
    return {
      address:
        AssetDictionary.get(networkType, sideNetworkType, asset)?.aggregatorData
          .aggregatorContractAddress || '',
      abi: massetAbi as AbiItem[],
    };
  }
}

export const babelFishService = new Babelfish();
