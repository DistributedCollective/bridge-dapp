import { Asset, NetworkType } from 'types';
import { network } from 'services';
import { AssetDictionary, NetworkDictionary } from 'dictionaries';
import erc20Abi from 'assets/abi/ERC20Abi.json';

class Token {
  public async balanceOf(
    networkType: NetworkType,
    asset: Asset,
    owner: string,
  ) {
    const token = AssetDictionary.getContractAddress(networkType, asset);
    if (token) {
      return network.call(networkType, token, erc20Abi as any, 'balanceOf', [
        owner,
      ]);
    }
    return '0';
  }

  public async allowance(
    networkType: NetworkType,
    asset: Asset,
    owner: string,
  ) {
    const { bridgeContractAddress } = NetworkDictionary.get(networkType);
    const token = AssetDictionary.getContractAddress(networkType, asset);
    if (token) {
      return network.call(networkType, token, erc20Abi as any, 'allowance', [
        owner,
        bridgeContractAddress,
      ]);
    }
    return '0';
  }

  public async approve(networkType: NetworkType, asset: Asset, amount: string) {
    const { bridgeContractAddress } = NetworkDictionary.get(networkType);
    const token = AssetDictionary.getContractAddress(networkType, asset);
    if (token) {
      return network.send(
        networkType,
        token,
        erc20Abi as any,
        'approve',
        [bridgeContractAddress, amount],
        {
          value: '0',
        },
      );
    }
    return Promise.reject('Unknown token.');
  }
}

export const token = new Token();
