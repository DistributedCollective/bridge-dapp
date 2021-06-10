import { AssetDetails } from '../../models/AssetDetails';
import { Asset } from '../../types';
import daiIcon from '../../assets/tokens/dai.svg';
import usdcIcon from '../../assets/tokens/usdc.svg';
import usdtIcon from '../../assets/tokens/usdt.svg';
import ethIcon from '../../assets/tokens/eth.svg';
import { BabelFishDetails } from '../../models/BabelFishDetails';
import { ethsAggregatorRSK, xusdAggregatorRSK } from './rsk-eth-mainnet-assets';
import sovIcon from '../../assets/tokens/sov.svg';

export const ethRskMainnetAssets = [
  new AssetDetails(
    Asset.eSOV,
    'eSOV',
    'eSOV',
    sovIcon,
    18,
    '0xbdab72602e9ad40fc6a6852caf43258113b8f7a5',
    false,
    new BabelFishDetails(
      false,
      '0xbdab72602e9ad40fc6a6852caf43258113b8f7a5',
      false,
      [Asset.SOV],
      new Map<Asset, string>(),
      Asset.SOV,
    ),
  ),
  new AssetDetails(
    Asset.ETH,
    'ETH',
    'ETH',
    ethIcon,
    18,
    '0xd412acd34a832a09c80c8a4895ff46d733f09538',
    true,
    new BabelFishDetails(
      ethsAggregatorRSK,
      '0xd412acd34a832a09c80c8a4895ff46d733f09538',
      false,
      [Asset.ETHs],
      new Map<Asset, string>(),
      Asset.ETHs,
    ),
  ),
  new AssetDetails(
    Asset.USDT,
    'USDT',
    'USDT',
    usdtIcon,
    6,
    '0xdac17f958d2ee523a2206206994597c13d831ec7',
    false,
    new BabelFishDetails(
      xusdAggregatorRSK,
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
      true,
      [Asset.XUSD],
      new Map<Asset, string>(),
      Asset.XUSD,
    ),
  ),
  new AssetDetails(
    Asset.USDC,
    'USDC',
    'USDC',
    usdcIcon,
    6,
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    false,
    new BabelFishDetails(
      xusdAggregatorRSK,
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      true,
      [Asset.XUSD],
      new Map<Asset, string>(),
      Asset.XUSD,
    ),
  ),
  new AssetDetails(
    Asset.DAI,
    'DAI',
    'DAI',
    daiIcon,
    18,
    '0x6b175474e89094c44da98b954eedeac495271d0f',
    false,
    new BabelFishDetails(
      xusdAggregatorRSK,
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      true,
      [Asset.XUSD],
      new Map<Asset, string>(),
      Asset.XUSD,
    ),
  ),
];
