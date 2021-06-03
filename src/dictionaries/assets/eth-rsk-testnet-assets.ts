import { AssetDetails } from '../../models/AssetDetails';
import { Asset } from '../../types';
import daiIcon from '../../assets/tokens/dai.svg';
import usdcIcon from '../../assets/tokens/usdc.svg';
import usdtIcon from '../../assets/tokens/usdt.svg';
import ethIcon from '../../assets/tokens/eth.svg';
import { BabelFishDetails } from '../../models/BabelFishDetails';

export const ethRskTesnetAssets = [
  new AssetDetails(
    Asset.USDT,
    'USDT',
    'USDT',
    usdtIcon,
    18,
    '',
    false,
    new BabelFishDetails('0x', '0x', true, [Asset.XUSD]),
  ),
  new AssetDetails(
    Asset.USDC,
    'USDC',
    'USDC',
    usdcIcon,
    18,
    '',
    false,
    new BabelFishDetails('0x', '0x', true, [Asset.XUSD]),
  ),
  new AssetDetails(
    Asset.DAI,
    'DAI',
    'DAI',
    daiIcon,
    18,
    '',
    false,
    new BabelFishDetails('0x', '0x', true, [Asset.XUSD]),
  ),
  new AssetDetails(
    Asset.ETH,
    'ETH',
    'ETH',
    ethIcon,
    18,
    '',
    true,
    new BabelFishDetails('0x', '0x', true, [Asset.ETHs]),
  ),
];
