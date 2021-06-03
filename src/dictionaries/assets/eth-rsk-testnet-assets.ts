import { AssetDetails } from '../../models/AssetDetails';
import { Asset } from '../../types';
import daiIcon from '../../assets/tokens/dai.svg';
import usdcIcon from '../../assets/tokens/usdc.svg';
import usdtIcon from '../../assets/tokens/usdt.svg';
import ethIcon from '../../assets/tokens/eth.svg';
import { BabelFishDetails } from '../../models/BabelFishDetails';

const xusdAggregator = '0x';
const ethsAggregator = '0x5BB6De260127306741D93dB9D92079499F09e452';

export const ethRskTesnetAssets = [
  new AssetDetails(
    Asset.USDT,
    'USDT',
    'USDT',
    usdtIcon,
    18,
    '0xff364ffa4962cb172203a5be01d17cf3fef02419',
    false,
    new BabelFishDetails(xusdAggregator, '0x', true, [Asset.XUSD]),
  ),
  new AssetDetails(
    Asset.USDC,
    'USDC',
    'USDC',
    usdcIcon,
    18,
    '0x4C68058992b8aD1243eE23A5923023C0e15Cf43F',
    false,
    new BabelFishDetails(xusdAggregator, '0x', true, [Asset.XUSD]),
  ),
  new AssetDetails(
    Asset.DAI,
    'DAI',
    'DAI',
    daiIcon,
    18,
    '0x974cf21396D4D29F8e63Ac07eCfcbaB51a739bc9',
    false,
    new BabelFishDetails(xusdAggregator, '0x', true, [Asset.XUSD]),
  ),
  new AssetDetails(
    Asset.ETH,
    'ETH',
    'ETH',
    ethIcon,
    18,
    '0x499bB1355B36aDeb93706B08A897CE6022de6aC9',
    true,
    new BabelFishDetails(
      ethsAggregator,
      '0xa1F7EfD2B12aBa416f1c57b9a54AC92B15C3A792',
      true,
      [Asset.ETHs],
    ),
  ),
];
