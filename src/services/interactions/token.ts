import type { Asset, NetworkType } from 'types';
import { network } from 'services';
import { AssetDictionary, BridgeDictionary } from 'dictionaries';
import erc20Abi from 'assets/abi/ERC20Abi.json';

class Token {
  public async balanceOf(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
    asset: Asset,
    owner: string,
  ) {
    const isNative =
      AssetDictionary.get(networkType, sideNetworkType, asset)?.isNative ||
      false;

    if (isNative) {
      const web3 = await network.getWeb3ForNetwork(networkType);
      return web3.eth.getBalance(owner);
    }

    const token = AssetDictionary.getTokenContractAddress(
      networkType,
      sideNetworkType,
      asset,
    );

    const abi = AssetDictionary.getTokenContractAbi(
      networkType,
      sideNetworkType,
      asset,
    );

    if (token) {
      return network
        .call(networkType, token, abi as any, 'balanceOf', [owner])
        .catch(e => console.error(e));
    }
    return '0';
  }

  public async allowance(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
    asset: Asset,
    owner: string,
    spender?: string,
  ) {
    if (spender === undefined) {
      const { bridgeContractAddress } = BridgeDictionary.get(
        networkType,
        sideNetworkType,
      );
      spender = bridgeContractAddress;
    }
    const token = AssetDictionary.getTokenContractAddress(
      networkType,
      sideNetworkType,
      asset,
    );
    if (token) {
      return network.call(networkType, token, erc20Abi as any, 'allowance', [
        owner,
        spender.toLowerCase(),
      ]);
    }
    return '0';
  }

  public async approve(
    networkType: NetworkType,
    sideNetworkType: NetworkType,
    asset: Asset,
    amount: string,
    spender?: string,
  ) {
    if (spender === undefined) {
      const { bridgeContractAddress } = BridgeDictionary.get(
        networkType,
        sideNetworkType,
      );
      spender = bridgeContractAddress;
    }

    const token = AssetDictionary.getTokenContractAddress(
      networkType,
      sideNetworkType,
      asset,
    );
    if (token) {
      return network.send(
        networkType,
        token,
        erc20Abi as any,
        'approve',
        [spender.toLowerCase(), amount],
        {
          value: '0',
        },
      );
    }
    return Promise.reject('Unknown token.');
  }
}

export const token = new Token();
