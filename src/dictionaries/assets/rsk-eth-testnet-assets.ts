import { AssetDetails } from '../../models/AssetDetails';
import { Asset } from '../../types';
import { BabelFishDetails } from '../../models/BabelFishDetails';
import sovIcon from '../../assets/tokens/sov.svg';
import ethsIcon from '../../assets/tokens/eths.svg';
import xusdIcon from '../../assets/tokens/xusd.svg';

export const xusdAggregatorRSK = '0x8d85F8E33cC720206b9A968f3A3A75029be5eb06';
export const ethsAggregatorRSK = '0x04D92DaA8f3Ef7bD222195e8D1DbE8D89A8CebD3';

export const rskEthTesnetAssets = [
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
      [Asset.eSOV],
      new Map<Asset, string>(),
      Asset.SOV,
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
      '0x4F2Fc8d55c1888A5AcA2503e2F3E5d74eef37C33',
      false,
      [Asset.ETH],
      new Map<Asset, string>([
        [Asset.ETH, '0x4F2Fc8d55c1888A5AcA2503e2F3E5d74eef37C33'],
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
    '0x849D38abD3962cb40d4887E4279ad0e4E5958e34',
    false,
    new BabelFishDetails(
      xusdAggregatorRSK,
      '0x10C5A7930fC417e728574E334b1488b7895c4B81', // usdtes
      true,
      [Asset.USDT, Asset.USDC, Asset.DAI],
      new Map<Asset, string>([
        [Asset.USDT, '0x10C5A7930fC417e728574E334b1488b7895c4B81'],
        [Asset.USDC, '0xcc8Eec21ae75F1A2dE4aC7b32A7de888a45cF859'],
        [Asset.DAI, '0xcb92C8D49Ec01b92F2A766C7c3C9C501C45271E0'],
      ]),
      Asset.XUSD,
    ),
  ),
];
