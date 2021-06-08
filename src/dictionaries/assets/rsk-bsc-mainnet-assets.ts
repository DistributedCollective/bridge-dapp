import { AssetDetails } from '../../models/AssetDetails';
import { Asset } from '../../types';
import xusdIcon from '../../assets/tokens/xusd.svg';
import { BabelFishDetails } from '../../models/BabelFishDetails';
import ethsIcon from '../../assets/tokens/eths.svg';
import { ethsAggregatorRSK, xusdAggregatorRSK } from './rsk-eth-mainnet-assets';

export const rskBscMainnetAssets = [
  new AssetDetails(
    Asset.XUSD,
    'XUSD',
    'XUSD',
    xusdIcon,
    18,
    '0xb5999795BE0EbB5bAb23144AA5FD6A02D080299F',
    false,
    new BabelFishDetails(
      xusdAggregatorRSK,
      '0xFf4299bCA0313C20A61dc5eD597739743BEf3f6d', // bsusdt
      true,
      [Asset.USDT, Asset.USDC, Asset.DAI, Asset.BUSD],
      new Map<Asset, string>([
        [Asset.USDT, '0xFf4299bCA0313C20A61dc5eD597739743BEf3f6d'],
        [Asset.USDC, '0x91EDceE9567cd5612c9DEDeaAE24D5e574820af1'],
        [Asset.DAI, '0x6A42Ff12215a90f50866A5cE43A9c9C870116e76'],
        [Asset.BUSD, '0x61e9604e31a736129d7f5C58964c75935b2d80D6'],
      ]),
      Asset.XUSD,
    ),
  ),
  new AssetDetails(
    Asset.ETHs,
    'ETHs',
    'ETHs',
    ethsIcon,
    18,
    '0x1D931BF8656D795e50Ef6d639562C5bD8AC2b78F',
    false,
    new BabelFishDetails(
      ethsAggregatorRSK,
      '0x30d1B36924c2c0CD1c03EC257D7FFf31bD8c3007',
      false,
      [Asset.ETH],
      new Map<Asset, string>([
        [Asset.ETH, '0x30d1B36924c2c0CD1c03EC257D7FFf31bD8c3007'],
      ]),
      Asset.ETHs,
    ),
  ),
];
