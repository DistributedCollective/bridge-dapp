import { AppMode, NetworkChainId, NetworkType } from 'types';
import { NetworkDetails } from 'models/NetworkDetails';
import { APP_MODE } from 'utils/network-utils';

import rskLogo from 'assets/chains/rsk.svg';
import ethLogo from 'assets/chains/eth.svg';

export class NetworkDictionary {
  public static networks: NetworkDetails[] = [
    /* RSK networks */
    new NetworkDetails(
      NetworkType.RSK,
      AppMode.MAINNET,
      NetworkChainId.RSK_MAINNET,
      'RSK',
      rskLogo,
      'https://mainnet.sovryn.app/rpc',
      '0x',
    ),
    new NetworkDetails(
      NetworkType.RSK,
      AppMode.TESTNET,
      NetworkChainId.RSK_TESTNET,
      'RSK Testnet',
      rskLogo,
      'wss://testnet.sovryn.app/ws',
      '0x0c8bdab4b9d86d4ab5b1c484675d95fc8ee00f06',
    ),
    /* Ethereum networks */
    new NetworkDetails(
      NetworkType.ETH,
      AppMode.MAINNET,
      NetworkChainId.ETH_MAINNET,
      'Ethereum',
      ethLogo,
      'https://mainnet.sovryn.app/rpc',
      '0x',
    ),
    new NetworkDetails(
      NetworkType.ETH,
      AppMode.TESTNET,
      NetworkChainId.ETH_TESTNET,
      'Kovan',
      ethLogo,
      'wss://kovan.infura.io/ws/v3/237d5a5403134af7b7211fd6996c15d3',
      '0x0648fe75d764c37d8624dd8c99b8223344eb77e8',
    ),
  ];

  public static list() {
    return this.networks.filter(item => item.mode === APP_MODE);
  }

  public static get(network: NetworkType) {
    const item = this.list().find(item => item.network === network);
    if (item === undefined)
      throw new Error('There is no chain for ' + network + ' network.');
    return item;
  }

  public static getChainId(network: NetworkType) {
    return this.get(network).chainId;
  }

  public static getByChainId(chainId: NetworkChainId) {
    return this.networks.find(item => item.chainId === chainId);
  }
}
