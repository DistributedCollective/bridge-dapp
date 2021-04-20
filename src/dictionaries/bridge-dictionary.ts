import { NetworkChainId, NetworkType } from 'types';
import { BridgeDetails } from '../models/BridgeDetails';
import { rskBscTestnetAssets } from './assets/rsk-bsc-testnet-assets';
import { rskEthTesnetAssets } from './assets/rsk-eth-testnet-assets';
import { NetworkDictionary } from './index';
import { APP_MODE } from '../utils/network-utils';
import { NetworkDetails } from '../models/NetworkDetails';
import { unique } from '../utils/helpers';

export class BridgeDictionary {
  public static bridges: BridgeDetails[] = [
    // RSK-BSC bridges
    new BridgeDetails(
      NetworkType.RSK,
      NetworkChainId.RSK_TESTNET,
      NetworkChainId.BSC_TESTNET,
      '0xc0e7a7fff4aba5e7286d5d67dd016b719dcc9156',
      rskBscTestnetAssets,
    ),
    new BridgeDetails(
      NetworkType.BSC,
      NetworkChainId.BSC_TESTNET,
      NetworkChainId.RSK_TESTNET,
      '0x97e57588c479324c8c645501e707671100badc72',
      rskBscTestnetAssets,
    ),
    // RSK-ETH bridges
    new BridgeDetails(
      NetworkType.RSK,
      NetworkChainId.RSK_TESTNET,
      NetworkChainId.ETH_TESTNET,
      '0xC0E7A7FfF4aBa5e7286D5d67dD016B719DCc9156',
      rskEthTesnetAssets,
    ),
    new BridgeDetails(
      NetworkType.ETH,
      NetworkChainId.ETH_TESTNET,
      NetworkChainId.RSK_TESTNET,
      '0x2b456e230225C4670FBF10b9dA506C019a24cAC7',
      rskEthTesnetAssets,
    ),
  ];

  public static listNetworks() {
    return this.bridges
      .map(item => item.mainChainId)
      .filter(unique)
      .map(item => NetworkDictionary.getByChainId(item) as NetworkDetails)
      .filter(item => item.mode === APP_MODE);
  }

  public static getSideBridges(networkType: NetworkType) {
    const network = this.listNetworks().find(
      item => item.network === networkType,
    );
    if (network === undefined)
      throw new Error('There is no bridge for ' + networkType + ' network.');
    return this.bridges.filter(item => item.sideChainId === network.chainId);
  }

  public static getMainBridges(sideNetworkType: NetworkType) {
    const network = this.listNetworks().find(
      item => item.network === sideNetworkType,
    );
    if (network === undefined)
      throw new Error(
        'There is no bridge for ' + sideNetworkType + ' network.',
      );
    return this.bridges.filter(item => item.mainChainId === network.chainId);
  }

  public static getSideNetworks(sideNetworkType: NetworkType) {
    return this.getMainBridges(sideNetworkType).map(
      item =>
        NetworkDictionary.getByChainId(item.sideChainId) as NetworkDetails,
    );
  }

  public static getMainNetworks(networkType: NetworkType) {
    return this.getSideBridges(networkType).map(
      item =>
        NetworkDictionary.getByChainId(item.mainChainId) as NetworkDetails,
    );
  }

  public static get(mainNetwork: NetworkType, sideNetwork: NetworkType) {
    const mainChainId = NetworkDictionary.getChainId(mainNetwork);
    const sideChainId = NetworkDictionary.getChainId(sideNetwork);
    return this.getByChainId(mainChainId, sideChainId) as BridgeDetails;
  }

  public static getByChainId(
    mainChainId: NetworkChainId,
    sideChainId: NetworkChainId,
  ) {
    return this.bridges.find(
      item =>
        item.mainChainId === mainChainId && item.sideChainId === sideChainId,
    );
  }
}
