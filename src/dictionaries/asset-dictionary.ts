import { Asset, NetworkChainId, NetworkType } from 'types';
import { AssetDetails } from 'models/AssetDetails';
import { NetworkDictionary } from './index';

import wbtcIcon from 'assets/tokens/wbtc.svg';
import renBtcIcon from 'assets/tokens/renBTC.svg';

export class AssetDictionary {
  public static assets: AssetDetails[] = [
    new AssetDetails(
      Asset.WBTC,
      'WBTC',
      'Wrapped Bitcoin',
      wbtcIcon,
      18,
      new Map([
        [
          NetworkChainId.RSK_TESTNET,
          '0xAe8349865a010a597d8Cfda3f2356A5fbC6FBD77'.toLowerCase(),
        ],
        [
          NetworkChainId.ETH_TESTNET,
          '0x3565c6217a9311294a8502dbe1e1f7b8816ed038'.toLowerCase(),
        ],
      ]),
    )
      .setDecimals(
        new Map<NetworkChainId, number>([
          [NetworkChainId.ETH_MAINNET, 8],
          [NetworkChainId.ETH_TESTNET, 8],
        ]),
      )
      .setSymbols(
        new Map<NetworkChainId, string>([
          [NetworkChainId.RSK_MAINNET, 'rWBTC'],
          [NetworkChainId.ETH_MAINNET, 'WBTC'],
          [NetworkChainId.RSK_TESTNET, 'rWBTC'],
          [NetworkChainId.ETH_TESTNET, 'WBTC'],
        ]),
      ),
    new AssetDetails(
      Asset.renBTC,
      'renBTC',
      'renBTC',
      renBtcIcon,
      18,
      new Map([
        [
          NetworkChainId.RSK_TESTNET,
          '0x434D5b134d4c4cbdC6be5F862E3196e62eeE2364'.toLowerCase(),
        ],
        [
          NetworkChainId.ETH_TESTNET,
          '0x588BB5a9F9b99e66d2B8c0fc5c840839f4Ca2e0a'.toLowerCase(),
        ],
      ]),
    )
      .setDecimals(
        new Map<NetworkChainId, number>([
          [NetworkChainId.ETH_MAINNET, 8],
          [NetworkChainId.ETH_TESTNET, 8],
        ]),
      )
      .setSymbols(
        new Map<NetworkChainId, string>([
          [NetworkChainId.RSK_MAINNET, 'rRenBTC'],
          [NetworkChainId.ETH_MAINNET, 'RenBTC'],
          [NetworkChainId.RSK_TESTNET, 'rRenBTC'],
          [NetworkChainId.ETH_TESTNET, 'RenBTC'],
        ]),
      ),
  ];

  public static list(network: NetworkType) {
    const chainId = NetworkDictionary.getChainId(network);
    if (chainId === undefined) {
      return [];
    }
    return this.listForChainId(chainId);
  }

  public static get(network: NetworkType, asset: Asset) {
    return this.list(network).find(item => item.asset === asset);
  }

  public static listForChainId(chainId: NetworkChainId) {
    return this.assets.filter(item =>
      Array.from(item.contracts.keys()).includes(chainId),
    );
  }

  public static getForChainId(chainId: NetworkChainId, asset: Asset) {
    return this.listForChainId(chainId).find(item => item.asset === asset);
  }

  public static getContractAddress(network: NetworkType, asset: Asset) {
    const item = this.get(network, asset);
    if (item) {
      return item.contracts.get(NetworkDictionary.getChainId(network));
    }
    return undefined;
  }

  public static getSymbol(network: NetworkType, asset: Asset) {
    const item = this.get(network, asset);
    if (item) {
      return (
        item.symbols.get(NetworkDictionary.getChainId(network)) || item.symbol
      );
    }
    return undefined;
  }

  public static isNativeCoin(network: NetworkType, asset: Asset) {
    const item = this.get(network, asset);
    if (item) {
      return (
        item.nativeCoins.get(NetworkDictionary.getChainId(network)) || false
      );
    }
    return false;
  }

  public static getDecimals(network: NetworkType, asset: Asset) {
    const item = this.get(network, asset);
    if (item) {
      return (
        item.decimalMap.get(NetworkDictionary.getChainId(network)) ||
        item.decimals
      );
    }
    return undefined;
  }
}
