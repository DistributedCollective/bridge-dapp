import { AssetDetails } from '../../models/AssetDetails';
import { BabelFishDetails } from '../../models/BabelFishDetails';
import { Asset } from '../../types';
import daiIcon from '../../assets/tokens/dai.svg';
import usdcIcon from '../../assets/tokens/usdc.svg';
import usdtIcon from '../../assets/tokens/usdt.svg';
import ethIcon from '../../assets/tokens/eth.svg';
import busdIcon from '../../assets/tokens/busd.svg';
import bnbIcon from '../../assets/tokens/bnb.svg';
import { ethsAggregatorRSK, xusdAggregatorRSK } from './rsk-eth-mainnet-assets';
import { bnbsAggregatorRSK } from './rsk-bsc-mainnet-assets';

export const bscRskMainnetAssets = [
  new AssetDetails(
    Asset.BNB,
    'BNB',
    'BNB',
    bnbIcon,
    18,
    '0xB6C313a427fa911A4C9a119e80Feea0fe20E69F0',
    true,
    new BabelFishDetails(
      bnbsAggregatorRSK,
      '0xB6C313a427fa911A4C9a119e80Feea0fe20E69F0',
      false,
      [Asset.BNBs],
      new Map<Asset, string>(),
      Asset.BNBs,
    ),
  ),
  new AssetDetails(
    Asset.BUSD,
    'BUSD',
    'BUSD',
    busdIcon,
    18,
    '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    false,
    new BabelFishDetails(
      xusdAggregatorRSK,
      '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      true,
      [Asset.XUSD],
      new Map<Asset, string>(),
      Asset.XUSD,
    ),
  ),
  new AssetDetails(
    Asset.ETH,
    'ETH',
    'ETH',
    ethIcon,
    18,
    '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    false,
    new BabelFishDetails(
      ethsAggregatorRSK,
      '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
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
    18,
    '0x55d398326f99059ff775485246999027b3197955',
    false,
    new BabelFishDetails(
      xusdAggregatorRSK,
      '0x55d398326f99059ff775485246999027b3197955',
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
    18,
    '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    false,
    new BabelFishDetails(
      xusdAggregatorRSK,
      '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
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
    '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    false,
    new BabelFishDetails(
      xusdAggregatorRSK,
      '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
      true,
      [Asset.XUSD],
      new Map<Asset, string>(),
      Asset.XUSD,
    ),
  ),
];
