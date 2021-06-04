// import { AssetDetails } from '../../models/AssetDetails';
// import { BabelFishDetails } from '../../models/BabelFishDetails';
// import { Asset, NetworkChainId } from '../../types';
// import daiIcon from '../../assets/tokens/dai.svg';
// import usdcIcon from '../../assets/tokens/usdc.svg';
// import usdtIcon from '../../assets/tokens/usdt.svg';
// import sovIcon from '../../assets/tokens/sov.svg';
// import ethIcon from '../../assets/tokens/eth.svg';

import { AssetDetails } from '../../models/AssetDetails';
import { Asset } from '../../types';
import xusdIcon from '../../assets/tokens/xusd.svg';
import { BabelFishDetails } from '../../models/BabelFishDetails';
import ethsIcon from '../../assets/tokens/eths.svg';
import { ethsAggregatorRSK, xusdAggregatorRSK } from './rsk-eth-testnet-assets';

export const rskBscTestnetAssets = [
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
];
