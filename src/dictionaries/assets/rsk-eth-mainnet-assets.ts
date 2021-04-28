import { AssetDetails } from '../../models/AssetDetails';
import { Asset, NetworkChainId } from '../../types';
import daiIcon from '../../assets/tokens/dai.svg';
import usdcIcon from '../../assets/tokens/usdc.svg';
import usdtIcon from '../../assets/tokens/usdt.svg';
import sovIcon from '../../assets/tokens/sov.svg';

export const rskEthMainnetAssets = [
  new AssetDetails(
    Asset.SOV,
    'SOV',
    'SOV',
    sovIcon,
    18,
    new Map([
      [
        NetworkChainId.RSK_MAINNET,
        '0xEfC78FC7D48B64958315949279bA181C2114abbD'.toLowerCase(),
      ],
      [
        NetworkChainId.ETH_MAINNET,
        '0xbdab72602e9ad40fc6a6852caf43258113b8f7a5'.toLowerCase(),
      ],
    ]),
  ).setSymbols(
    new Map<NetworkChainId, string>([[NetworkChainId.ETH_MAINNET, 'eSOV']]),
  ),
  new AssetDetails(
    Asset.DAI,
    'DAI',
    'DAI',
    daiIcon,
    18,
    new Map([
      [
        NetworkChainId.RSK_MAINNET,
        '0x1A37c482465e78E6DAbE1Ec77B9a24D4236D2A11'.toLowerCase(),
      ],
      [
        NetworkChainId.ETH_MAINNET,
        '0x6b175474e89094c44da98b954eedeac495271d0f'.toLowerCase(),
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
        NetworkChainId.RSK_MAINNET,
        '0x8D1f7CbC6391D95E2774380e80A666FEbf655D6b'.toLowerCase(),
      ],
      [
        NetworkChainId.ETH_MAINNET,
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'.toLowerCase(),
      ],
    ]),
  )
    .setSymbols(
      new Map<NetworkChainId, string>([[NetworkChainId.RSK_MAINNET, 'USDCes']]),
    )
    .setDecimals(
      new Map<NetworkChainId, number>([[NetworkChainId.RSK_MAINNET, 18]]),
    ),
  new AssetDetails(
    Asset.USDT,
    'USDT',
    'USDT',
    usdtIcon,
    6,
    new Map([
      [
        NetworkChainId.RSK_MAINNET,
        '0xD9665EA8F5fF70Cf97E1b1Cd1B4Cd0317b0976e8'.toLowerCase(),
      ],
      [
        NetworkChainId.ETH_MAINNET,
        '0xdac17f958d2ee523a2206206994597c13d831ec7'.toLowerCase(),
      ],
    ]),
  )
    .setSymbols(
      new Map<NetworkChainId, string>([[NetworkChainId.RSK_MAINNET, 'USDTes']]),
    )
    .setDecimals(
      new Map<NetworkChainId, number>([[NetworkChainId.RSK_MAINNET, 18]]),
    ),
];
