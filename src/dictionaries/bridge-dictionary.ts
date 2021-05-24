import { Asset, NetworkChainId, NetworkType } from 'types';
import { BridgeDetails } from '../models/BridgeDetails';
import { rskEthTesnetAssets } from './assets/rsk-eth-testnet-assets';
import { rskEthMainnetAssets } from './assets/rsk-eth-mainnet-assets';
import { NetworkDictionary } from './index';
import { APP_MODE } from '../utils/network-utils';
import { NetworkDetails } from '../models/NetworkDetails';
import { unique } from '../utils/helpers';

export class BridgeDictionary {
  public static bridges: BridgeDetails[] = [
    // // RSK-BSC mainnet bridges
    // new BridgeDetails(
    //   NetworkType.RSK,
    //   NetworkChainId.RSK_MAINNET,
    //   NetworkChainId.BSC_MAINNET,
    //   '0xB8411dc9B723e322CE08E2596881B77733F0694e',
    //   rskBscMainnetAssets,
    // ),
    // new BridgeDetails(
    //   NetworkType.BSC,
    //   NetworkChainId.BSC_MAINNET,
    //   NetworkChainId.RSK_MAINNET,
    //   '0x1b5fe0CDD01FA7278244B4B2d7b434fe83D88dB4',
    //   rskBscMainnetAssets,
    // ),
    // RSK-BSC testnet bridges
    // new BridgeDetails(
    //   NetworkType.RSK,
    //   NetworkChainId.RSK_TESTNET,
    //   NetworkChainId.BSC_TESTNET,
    //   '0x39500B3864ddda31633319C8A570176a79977A42',
    //   rskBscTestnetAssets,
    // ),
    // new BridgeDetails(
    //   NetworkType.BSC,
    //   NetworkChainId.BSC_TESTNET,
    //   NetworkChainId.RSK_TESTNET,
    //   '0x97E57588C479324C8C645501e707671100baDc72',
    //   rskBscTestnetAssets,
    // ),
    // RSK-ETH mainnet bridges
    new BridgeDetails(
      NetworkType.RSK,
      NetworkChainId.RSK_MAINNET,
      NetworkChainId.ETH_MAINNET,
      '0x1CcAd820B6d031B41C54f1F3dA11c0d48b399581',
      rskEthMainnetAssets.filter(item => item.asset === Asset.ETH),
    ),
    new BridgeDetails(
      NetworkType.ETH,
      NetworkChainId.ETH_MAINNET,
      NetworkChainId.RSK_MAINNET,
      '0x33C0D33a0d4312562ad622F91d12B0AC47366EE1',
      rskEthMainnetAssets.filter(item => item.asset === Asset.ETH),
    ),
    // RSK-ETH testnet bridges
    new BridgeDetails(
      NetworkType.RSK,
      NetworkChainId.RSK_TESTNET,
      NetworkChainId.ETH_TESTNET,
      '0xC0E7A7FfF4aBa5e7286D5d67dD016B719DCc9156',
      rskEthTesnetAssets.filter(item => item.asset === Asset.ETH),
    ),
    new BridgeDetails(
      NetworkType.ETH,
      NetworkChainId.ETH_TESTNET,
      NetworkChainId.RSK_TESTNET,
      '0x2b456e230225C4670FBF10b9dA506C019a24cAC7',
      rskEthTesnetAssets.filter(item => item.asset === Asset.ETH),
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
