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
        '0x232db8D9F1B3558E692DA6210645bc8755a8f7d5'.toLowerCase(), //  todo
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
        '0x9eA9fdA7892637d9240e9489D4a6c878ce8f4F8C'.toLowerCase(), // todo
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
        '0xCd4c312495d426faE3dd09822D8a52fb8841dbA2'.toLowerCase(), // todo
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
