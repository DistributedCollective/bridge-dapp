import type { AbiItem } from 'web3-utils';
import CContract, { Contract } from 'web3-eth-contract';
import type { Asset, NetworkType } from '../../types';
import { AssetDictionary } from '../../dictionaries';
import massetAbi from '../../assets/abi/BabelFish_MassetAbi.json';

class Babelfish {
  public mintTo(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
    asset: Asset,
    bAsset: string,
    bAssetQuanity: string,
    recipient: string,
  ) {
    const contract = this.getContract(networkType, sideNetworkType, asset);
    if (!contract) return null;
    return {
      address: contract.options.address,
      data: contract.methods
        .mintTo(bAsset, bAssetQuanity, recipient)
        .encodeABI() as string,
    };
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
    const contract = this.getContract(networkType, sideNetworkType, asset);
    if (!contract) return null;
    return {
      address: contract.options.address,
      data: contract.methods
        .redeemToBridge(bAsset, mAssetQuanity, recipient, bridge)
        .encodeABI() as string,
    };
  }

  private getContract(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
    asset: Asset,
  ) {
    const { address, abi } = this.getMassetData(
      networkType,
      sideNetworkType,
      asset,
    );
    if (address === '') return null;
    // @ts-ignore
    return new CContract(abi, address) as Contract;
  }

  private getMassetData(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
    asset: Asset,
  ): { address: string; abi: AbiItem[] } {
    return {
      address:
        AssetDictionary.get(networkType, sideNetworkType, asset)?.getBabelFish()
          ?.rskContractAddress || '',
      abi: massetAbi as AbiItem[],
    };
  }
}

export const babelFishService = new Babelfish();
