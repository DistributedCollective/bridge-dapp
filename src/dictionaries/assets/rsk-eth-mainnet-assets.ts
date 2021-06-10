import { AssetDetails } from '../../models/AssetDetails';
import { Asset } from '../../types';
import { BabelFishDetails } from '../../models/BabelFishDetails';
import ethsIcon from '../../assets/tokens/eths.svg';
import xusdIcon from '../../assets/tokens/xusd.svg';
import sovIcon from '../../assets/tokens/sov.svg';

export const xusdAggregatorRSK = '0x1440d19436bEeaF8517896bffB957a88EC95a00F';
export const ethsAggregatorRSK = '0x4bF113905d7F69202106f613308bb02c84aaDF2F';

export const rskEthMainnetAssets = [
  new AssetDetails(
    Asset.SOV,
    'SOV',
    'SOV',
    sovIcon,
    18,
    '0xEfC78FC7D48B64958315949279bA181C2114abbD',
    false,
    new BabelFishDetails(
      false,
      '0xEfC78FC7D48B64958315949279bA181C2114abbD',
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
    '0x1D931Bf8656d795E50eF6D639562C5bD8Ac2B78f',
    false,
    new BabelFishDetails(
      ethsAggregatorRSK,
      '0xFe878227c8F334038DAb20a99fC3B373fFe0a755',
      false,
      [Asset.ETH],
      new Map<Asset, string>([
        [Asset.ETH, '0xFe878227c8F334038DAb20a99fC3B373fFe0a755'],
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
    '0xb5999795BE0EbB5bAb23144AA5FD6A02D080299F',
    false,
    new BabelFishDetails(
      xusdAggregatorRSK,
      '0xD9665EA8F5fF70Cf97E1b1Cd1B4Cd0317b0976e8', // usdtes
      true,
      [Asset.USDT, Asset.USDC, Asset.DAI],
      new Map<Asset, string>([
        [Asset.USDT, '0xD9665EA8F5fF70Cf97E1b1Cd1B4Cd0317b0976e8'],
        [Asset.USDC, '0x8D1f7CbC6391D95E2774380e80A666FEbf655D6b'],
        [Asset.DAI, '0x1A37c482465e78E6DAbE1Ec77B9a24D4236D2A11'],
      ]),
      Asset.XUSD,
    ),
  ),
];
