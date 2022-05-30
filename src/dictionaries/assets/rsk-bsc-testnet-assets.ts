import { AssetDetails } from '../../models/AssetDetails';
import { Asset } from '../../types';
import {
  BabelFishDetails,
  BabelFishRedeem,
} from '../../models/BabelFishDetails';
import xusdIcon from '../../assets/tokens/xusd.svg';
import ethsIcon from '../../assets/tokens/eths.svg';
import bnbsIcon from '../../assets/tokens/bnbs.svg';
import sovIcon from '../../assets/tokens/sov.svg';
import btcIcon from '../../assets/tokens/btc.svg';
import { ethsAggregatorRSK, xusdAggregatorRSK } from './rsk-eth-testnet-assets';

export const bnbsAggregatorRSK = '0x790C4451c2e8e4cDC50cEdEC22756DaC993e93eb';
export const btcsAggregatorBSC = '0xc54B47AC178273A42Fb71631d8018aD7EBbec330';

export const rskBscTestnetAssets = [
  new AssetDetails(
    Asset.SOV,
    'SOV',
    'SOV',
    sovIcon,
    18,
    '0x6a9A07972D07E58f0daF5122D11e069288A375fB',
    false,
    new BabelFishDetails(
      false,
      '0x6a9A07972D07E58f0daF5122D11e069288A375fB',
      false,
      [Asset.bSOV],
      new Map<Asset, string>(),
      Asset.SOV,
    ),
  ),
  new AssetDetails(
    Asset.RBTC,
    'RBTC',
    'RBTC',
    btcIcon,
    18,
    '0xf629e5C7527aC7Bc9ce26Bdd6D66F0eb955ef3B2',
    true,
    new BabelFishDetails(
      btcsAggregatorBSC,
      '0xf629e5C7527aC7Bc9ce26Bdd6D66F0eb955ef3B2',
      true,
      [Asset.BTCS],
      new Map<Asset, string>([
        [Asset.RBTC, '0xf629e5C7527aC7Bc9ce26Bdd6D66F0eb955ef3B2'],
      ]),
      Asset.RBTC,
      BabelFishRedeem.RECEIVE_ETH_AT,
    ),
  ),
  new AssetDetails(
    Asset.BNBs,
    'BNBs',
    'BNBs',
    bnbsIcon,
    18,
    '0x801F223Def9A4e3a543eAcCEFB79dCE981Fa2Fb5',
    false,
    new BabelFishDetails(
      bnbsAggregatorRSK,
      '0xafa6A1eb7E2282E8854822d2bB412b6db2cabA4E',
      false,
      [Asset.BNB],
      new Map<Asset, string>([
        [Asset.BNB, '0xafa6A1eb7E2282E8854822d2bB412b6db2cabA4E'],
      ]),
      Asset.BNBs,
    ),
  ),
  new AssetDetails(
    Asset.ETHs,
    'ETHs',
    'ETHs',
    ethsIcon,
    18,
    '0x0fd0D8D78CE9299eE0e5676A8D51f938c234162c',
    false,
    new BabelFishDetails(
      ethsAggregatorRSK,
      '0x793CE6F95912D5b43532c2116e1b68993d902272',
      false,
      [Asset.ETH],
      new Map<Asset, string>([
        [Asset.ETH, '0x793CE6F95912D5b43532c2116e1b68993d902272'],
      ]),
      Asset.ETHs,
    ),
  ),
  new AssetDetails(
    Asset.XUSD,
    'XUSD',
    'XUSD',
    xusdIcon,
    18,
    '0x74858FE37d391f81F89472e1D8BC8Ef9CF67B3b1',
    false,
    new BabelFishDetails(
      xusdAggregatorRSK,
      '0x43bc3f0ffff6c9bbf3c2eafe464c314d43f561de', // bsusdt
      true,
      [Asset.USDT, Asset.USDC, Asset.DAI, Asset.BUSD],
      new Map<Asset, string>([
        [Asset.USDT, '0x43bc3f0ffff6c9bbf3c2eafe464c314d43f561de'],
        [Asset.USDC, '0x3e2cf87e7ff4048a57f9cdde9368c9f4bfb43adf'],
        [Asset.DAI, '0x407ff7d4760d3a81b4740d268eb04490c7dfe7f2'],
        [Asset.BUSD, '0x8c9abb6c9d8d15ddb7ada2e50086e1050ab32688'],
      ]),
      Asset.XUSD,
    ),
  ),
];
