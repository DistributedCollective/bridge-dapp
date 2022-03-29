import { AppMode, NetworkChainId, NetworkType } from 'types';
import { NetworkDetails } from 'models/NetworkDetails';
import { APP_MODE } from 'utils/network-utils';

import rskLogo from 'assets/chains/rsk.svg';
import ethLogo from 'assets/chains/eth.svg';
import bscLogo from 'assets/chains/bsc.svg';

export class NetworkDictionary {
  public static networks: NetworkDetails[] = [
    /* RSK networks */
    new NetworkDetails(
      NetworkType.RSK,
      AppMode.MAINNET,
      NetworkChainId.RSK_MAINNET,
      'RSK',
      'RSK',
      'RBTC',
      18,
      rskLogo,
      'https://mainnet.sovryn.app/rpc',
      'https://explorer.rsk.co',
      'https://explorer.rsk.co/tx/:value',
      'https://explorer.rsk.co/address/:value',
    ),
    new NetworkDetails(
      NetworkType.RSK,
      AppMode.TESTNET,
      NetworkChainId.RSK_TESTNET,
      'RSK Testnet',
      'RSK - Testnet',
      't-RBTC',
      18,
      rskLogo,
      'https://testnet.sovryn.app/rpc',
      'https://explorer.testnet.rsk.co',
      'https://explorer.testnet.rsk.co/tx/:value',
      'https://explorer.testnet.rsk.co/address/:value',
    ),
    /* Ethereum networks */
    new NetworkDetails(
      NetworkType.ETH,
      AppMode.MAINNET,
      NetworkChainId.ETH_MAINNET,
      'Ethereum',
      'Ethereum',
      'ETH',
      18,
      ethLogo,
      'https://cloudflare-eth.com',
      // `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
      'https://etherscan.io',
      'https://etherscan.io/tx/:value',
      'https://etherscan.io/address/:value',
    ),
    new NetworkDetails(
      NetworkType.ETH,
      AppMode.TESTNET,
      NetworkChainId.ETH_TESTNET,
      'Ropsten',
      'Ropsten - Testnet',
      'RETH',
      18,
      ethLogo,
      `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
      'https://ropsten.etherscan.io',
      'https://ropsten.etherscan.io/tx/:value',
      'https://ropsten.etherscan.io/address/:value',
    ),
    /* Binance networks */
    new NetworkDetails(
      NetworkType.BSC,
      AppMode.MAINNET,
      NetworkChainId.BSC_MAINNET,
      'Binance',
      'Binance Smart Chain',
      'BNB',
      18,
      bscLogo,
      'https://bsc-dataseed.binance.org/',
      'https://bscscan.com',
      'https://bscscan.com/tx/:value',
      'https://bscscan.com/address/:value',
    ),
    new NetworkDetails(
      NetworkType.BSC,
      AppMode.TESTNET,
      NetworkChainId.BSC_TESTNET,
      'Binance',
      'Binance Smart Chain - Testnet',
      't-BNB',
      18,
      bscLogo,
      'https://data-seed-prebsc-2-s3.binance.org:8545/',
      'https://testnet.bscscan.com',
      'https://testnet.bscscan.com/tx/:value',
      'https://testnet.bscscan.com/address/:value',
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
