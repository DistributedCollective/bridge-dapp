import { AssetDetails } from '../../models/AssetDetails';
import { Asset } from '../../types';
import daiIcon from '../../assets/tokens/dai.svg';
import usdcIcon from '../../assets/tokens/usdc.svg';
import usdtIcon from '../../assets/tokens/usdt.svg';
import ethIcon from '../../assets/tokens/eth.svg';
import { BabelFishDetails } from '../../models/BabelFishDetails';
import { ethsAggregatorRSK, xusdAggregatorRSK } from './rsk-eth-testnet-assets';

export const ethRskTesnetAssets = [
  new AssetDetails(
    Asset.USDT,
    'USDT',
    'USDT',
    usdtIcon,
    6,
    '0xff364ffa4962cb172203a5be01d17cf3fef02419',
    false,
    new BabelFishDetails(
      xusdAggregatorRSK,
      '0xff364ffa4962cb172203a5be01d17cf3fef02419',
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
    '0x4C68058992b8aD1243eE23A5923023C0e15Cf43F',
    false,
    new BabelFishDetails(
      xusdAggregatorRSK,
      '0x4C68058992b8aD1243eE23A5923023C0e15Cf43F',
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
    '0x974cf21396D4D29F8e63Ac07eCfcbaB51a739bc9',
    false,
    new BabelFishDetails(
      xusdAggregatorRSK,
      '0x974cf21396D4D29F8e63Ac07eCfcbaB51a739bc9',
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
    '0xa1F7EfD2B12aBa416f1c57b9a54AC92B15C3A792',
    true,
    new BabelFishDetails(
      ethsAggregatorRSK,
      '0xa1F7EfD2B12aBa416f1c57b9a54AC92B15C3A792',
      false,
      [Asset.ETHs],
      new Map<Asset, string>(),
      Asset.ETHs,
    ),
  ),
];
