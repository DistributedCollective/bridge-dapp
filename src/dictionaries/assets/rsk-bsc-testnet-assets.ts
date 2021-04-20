import { AssetDetails } from '../../models/AssetDetails';
import { Asset, NetworkChainId } from '../../types';
import daiIcon from '../../assets/tokens/dai.svg';
import usdcIcon from '../../assets/tokens/usdc.svg';
import usdtIcon from '../../assets/tokens/usdt.svg';

export const rskBscTestnetAssets = [
  new AssetDetails(
    Asset.DAI,
    'DAI',
    'DAI',
    daiIcon,
    18,
    new Map([
      [
        NetworkChainId.RSK_TESTNET,
        '0xcb92C8D49Ec01b92F2A766C7c3C9C501C45271E0'.toLowerCase(), //  todo
      ],
      [
        NetworkChainId.BSC_TESTNET,
        '0x83241490517384cb28382bdd4d1534ee54d9350f'.toLowerCase(),
      ],
    ]),
  ).setSymbols(
    new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'DAIbs']]),
  ),
  new AssetDetails(
    Asset.USDC,
    'USDC',
    'USDC',
    usdcIcon,
    18,
    new Map([
      [
        NetworkChainId.RSK_TESTNET,
        '0xcc8Eec21ae75F1A2dE4aC7b32A7de888a45cF859'.toLowerCase(), // todo
      ],
      [
        NetworkChainId.BSC_TESTNET,
        '0x0b654c687dc8b828139406c070e0a34486e5072b'.toLowerCase(),
      ],
    ]),
  ).setSymbols(
    new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'USDCbs']]),
  ),
  new AssetDetails(
    Asset.USDT,
    'USDT',
    'USDT',
    usdtIcon,
    18,
    new Map([
      [
        NetworkChainId.RSK_TESTNET,
        '0xff364ffa4962cb172203a5be01d17cf3fef02419'.toLowerCase(), // todo
      ],
      [
        NetworkChainId.BSC_TESTNET,
        '0x013e679f3d66e227e843cd865b317f55a68481fd'.toLowerCase(),
      ],
    ]),
  ).setSymbols(
    new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'USDTbs']]),
  ),
];
