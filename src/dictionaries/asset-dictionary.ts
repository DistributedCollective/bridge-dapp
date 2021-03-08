import { Asset, NetworkChainId, NetworkType } from 'types';
import { AssetDetails } from 'models/AssetDetails';
import { NetworkDictionary } from './index';

import docIcon from 'assets/tokens/doc.svg';
import sovIcon from 'assets/tokens/sov.svg';
import btcIcon from 'assets/tokens/rbtc.png';

export class AssetDictionary {
  public static assets: AssetDetails[] = [
    new AssetDetails(
      Asset.DOC,
      'DOC',
      'DOC Stablecoin',
      docIcon,
      18,
      new Map([
        [
          NetworkChainId.RSK_TESTNET,
          '0xCB46c0ddc60D18eFEB0E586C17Af6ea36452Dae0'.toLowerCase(),
        ],
        [
          NetworkChainId.ETH_TESTNET,
          '0x1365c9cCA0BF5948A1d75c5D63aBBF1018993D4c'.toLowerCase(),
        ],
      ]),
    ),
    new AssetDetails(
      Asset.DAI,
      'DAI',
      'DAI Stablecoin',
      sovIcon,
      18,
      new Map([
        [
          NetworkChainId.RSK_TESTNET,
          '0x31FE2DF1e74c54a7d8753dd4317c118c5B9A6507'.toLowerCase(),
        ],
        [
          NetworkChainId.ETH_TESTNET,
          '0x1365c9cCA0BF5948A1d75c5D63aBBF1018993D4c'.toLowerCase(),
        ],
      ]),
    ),
    new AssetDetails(
      Asset.WBTC,
      'wBTC',
      'Wrapped Bitcoin',
      btcIcon,
      18,
      new Map([
        // [
        //   NetworkChainId.RSK_TESTNET,
        //   '0x6a9A07972D07e58F0daf5122d11E069288A375fb'.toLowerCase(),
        // ],
        [
          NetworkChainId.ETH_TESTNET,
          '0x3565C6217A9311294A8502dBe1e1f7B8816ed038'.toLowerCase(),
        ],
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
}
