import type { AbiItem } from 'web3-utils';
import CContract, { Contract } from 'web3-eth-contract';
import type { NetworkType } from '../../types';
import { BridgeDictionary } from '../../dictionaries';
import massetAbi from '../../assets/abi/BabelFish_MassetAbi.json';

class Babelfish {
  public mintTo(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
    bAsset: string,
    bAssetQuanity: string,
    recipient: string,
  ) {
    const contract = this.getContract(networkType, sideNetworkType);
    if (!contract) return null;
    return {
      address: contract.options.address,
      data: contract.methods
        .mintTo(bAsset, bAssetQuanity, recipient)
        .encodeABI() as string,
    };
  }

  private getContract(networkType: NetworkType, sideNetworkType: NetworkType) {
    const { address, abi } = this.getMassetData(networkType, sideNetworkType);
    if (address === '') return null;
    // @ts-ignore
    return new CContract(abi, address) as Contract;
  }

  private getMassetData(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
  ): { address: string; abi: AbiItem[] } {
    return {
      address: BridgeDictionary.get(networkType, sideNetworkType)
        .babelfishContractAddress,
      abi: massetAbi as AbiItem[],
    };
  }
}

export const babelFishService = new Babelfish();
