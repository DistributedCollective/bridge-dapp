import { AbiItem } from 'web3-utils';
import { Asset, NetworkType } from '../../types';
import { AssetDictionary } from '../../dictionaries';
import massetAbi from '../../assets/abi/BabelFish_MassetAbi.json';
import massetXusdAbi from '../../assets/abi/BabelFish_MassetAbi_xusd.json';
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
    targetAsset: Asset,
    bAsset: string,
    mAssetQuanity: string,
    recipient: string,
    bridge: string,
  ) {
    const { address, abi, useBridgeAddress } = this.getMassetData(
      networkType,
      sideNetworkType,
      asset,
    );

    const args = [bAsset, mAssetQuanity, recipient];

    if (useBridgeAddress) {
      args.push(bridge);
    }

    return network.send(networkType, address, abi, 'redeemToBridge', args);
  }

  private getMassetData(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
    asset: Asset,
  ): { address: string; abi: AbiItem[]; useBridgeAddress: boolean } {
    const aggregator = AssetDictionary.get(networkType, sideNetworkType, asset)
      ?.aggregatorData;
    let abi = massetAbi;
    let useBridgeAddress = true;

    if (aggregator?.version === Asset.XUSD) {
      useBridgeAddress = false;
      abi = massetXusdAbi;
    }

    return {
      address: aggregator?.aggregatorContractAddress || '',
      abi: abi as AbiItem[],
      useBridgeAddress,
    };
  }
}

export const babelFishService = new Babelfish();
