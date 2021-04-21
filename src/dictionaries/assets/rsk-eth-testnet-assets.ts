import { AssetDetails } from '../../models/AssetDetails';
import { Asset, NetworkChainId } from '../../types';
import daiIcon from '../../assets/tokens/dai.svg';
import usdcIcon from '../../assets/tokens/usdc.svg';
import usdtIcon from '../../assets/tokens/usdt.svg';

export const rskEthTesnetAssets = [
  new AssetDetails(
    Asset.DAI,
    'DAI',
    'DAI',
    daiIcon,
    18,
    new Map([
      [
        NetworkChainId.RSK_TESTNET,
        '0xcb92C8D49Ec01b92F2A766C7c3C9C501C45271E0'.toLowerCase(),
      ],
      [
        NetworkChainId.ETH_TESTNET,
        '0x974cf21396D4D29F8e63Ac07eCfcbaB51a739bc9'.toLowerCase(),
      ],
    ]),
  ).setSymbols(
    new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'DAIes']]),
  ),
  new AssetDetails(
    Asset.USDC,
    'USDC',
    'USDC',
    usdcIcon,
    6,
    new Map([
      [
        NetworkChainId.RSK_TESTNET,
        '0xcc8Eec21ae75F1A2dE4aC7b32A7de888a45cF859'.toLowerCase(),
      ],
      [
        NetworkChainId.ETH_TESTNET,
        '0x4C68058992b8aD1243eE23A5923023C0e15Cf43F'.toLowerCase(),
      ],
    ]),
  )
    .setSymbols(
      new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'USDCes']]),
    )
    .setDecimals(
      new Map<NetworkChainId, number>([[NetworkChainId.RSK_TESTNET, 18]]),
    ),
  new AssetDetails(
    Asset.USDT,
    'USDT',
    'USDT',
    usdtIcon,
    6,
    new Map([
      [
        NetworkChainId.RSK_TESTNET,
        '0x10C5A7930fC417e728574E334b1488b7895c4B81'.toLowerCase(), // todo
      ],
      [
        NetworkChainId.ETH_TESTNET,
        '0xff364ffa4962cb172203a5be01d17cf3fef02419'.toLowerCase(),
      ],
    ]),
  )
    .setSymbols(
      new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'USDTes']]),
    )
    .setDecimals(
      new Map<NetworkChainId, number>([[NetworkChainId.RSK_TESTNET, 18]]),
    ),
];
