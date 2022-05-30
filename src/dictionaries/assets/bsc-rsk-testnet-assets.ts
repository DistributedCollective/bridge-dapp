import { AssetDetails } from '../../models/AssetDetails';
import { Asset } from '../../types';
import daiIcon from '../../assets/tokens/dai.svg';
import usdcIcon from '../../assets/tokens/usdc.svg';
import usdtIcon from '../../assets/tokens/usdt.svg';
import ethIcon from '../../assets/tokens/eth.svg';
import bnbIcon from '../../assets/tokens/bnb.svg';
import busdIcon from '../../assets/tokens/busd.svg';
import sovIcon from '../../assets/tokens/sov.svg';
import rbtcIcon from '../../assets/tokens/btc.svg';
import {
  BabelFishDetails,
  BabelFishRedeem,
} from '../../models/BabelFishDetails';
import { ethsAggregatorRSK, xusdAggregatorRSK } from './rsk-eth-testnet-assets';
import { bnbsAggregatorRSK, btcsAggregatorBSC } from './rsk-bsc-testnet-assets';

export const bscRskTesnetAssets = [
  new AssetDetails(
    Asset.bSOV,
    'bSOV',
    'bSOV',
    sovIcon,
    18,
    '0x6b8daa42b8ac9a0d826981a9990248bef60e2d4c',
    false,
    new BabelFishDetails(
      false,
      '0x6b8daa42b8ac9a0d826981a9990248bef60e2d4c',
      false,
      [Asset.SOV],
      new Map<Asset, string>(),
      Asset.SOV,
    ),
  ),
  new AssetDetails(
    Asset.BTCS,
    'BTCS',
    'BTCS',
    rbtcIcon,
    18,
    '0xd0370a808203da14B703826eF77072ef5F09840D',
    false,
    new BabelFishDetails(
      btcsAggregatorBSC,
      '0xc41d41cb7a31c80662ac2d8ab7a7e5f5841eebc3',
      false,
      [Asset.RBTC],
      new Map<Asset, string>(),
      Asset.RBTC,
      BabelFishRedeem.REDEEM_WITH_EXTRA_DATA,
      '0x10C848e9495a32acA95F6c23C92eCA2b2bE9903A', // fastbtc bridge (rsk)
    ),
  ),
  new AssetDetails(
    Asset.BNB,
    'BNB',
    'BNB',
    bnbIcon,
    18,
    '0x68bD35422b457f315AA176743325a9F7C9830c68',
    true,
    new BabelFishDetails(
      bnbsAggregatorRSK,
      '0x68bD35422b457f315AA176743325a9F7C9830c68',
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
    '0x137BEc8c83740920ebc4f29f51C7B65b75Beec83',
    false,
    new BabelFishDetails(
      xusdAggregatorRSK,
      '0x137BEc8c83740920ebc4f29f51C7B65b75Beec83',
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
    '0x7d1FE4FdB0Afaf26ada5083A688139EbA10d3e1B',
    false,
    new BabelFishDetails(
      ethsAggregatorRSK,
      '0x7d1FE4FdB0Afaf26ada5083A688139EbA10d3e1B',
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
    '0x268e3bf855cbcdf8fe31ba3557a554ab2283351f',
    false,
    new BabelFishDetails(
      xusdAggregatorRSK,
      '0x268e3bf855cbcdf8fe31ba3557a554ab2283351f',
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
    '0x0b654c687dc8b828139406c070e0a34486e5072b',
    false,
    new BabelFishDetails(
      xusdAggregatorRSK,
      '0x0b654c687dc8b828139406c070e0a34486e5072b',
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
    '0x83241490517384cb28382bdd4d1534ee54d9350f',
    false,
    new BabelFishDetails(
      xusdAggregatorRSK,
      '0x83241490517384cb28382bdd4d1534ee54d9350f',
      true,
      [Asset.XUSD],
      new Map<Asset, string>(),
      Asset.XUSD,
    ),
  ),
];
