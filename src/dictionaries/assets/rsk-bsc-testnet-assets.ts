import { AssetDetails } from '../../models/AssetDetails';
import { BabelFishDetails } from '../../models/BabelFishDetails';
import { Asset, NetworkChainId } from '../../types';
import daiIcon from '../../assets/tokens/dai.svg';
import usdcIcon from '../../assets/tokens/usdc.svg';
import usdtIcon from '../../assets/tokens/usdt.svg';
import sovIcon from '../../assets/tokens/sov.svg';
import ethIcon from '../../assets/tokens/eth.svg';

export const rskBscTestnetAssets = [
  // new AssetDetails(
  //   Asset.ETH,
  //   'ETH',
  //   'ETH',
  //   ethIcon,
  //   18,
  //   new Map([
  //     [
  //       NetworkChainId.RSK_TESTNET,
  //       '0x793CE6F95912D5b43532c2116e1b68993d902272'.toLowerCase(),
  //     ],
  //     [
  //       NetworkChainId.BSC_TESTNET,
  //       '0x7d1FE4FdB0Afaf26ada5083A688139EbA10d3e1B'.toLowerCase(),
  //     ],
  //   ]),
  // )
  //   .setSymbols(
  //     new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'bsETH']]),
  //   )
  //   .setBabelFish(
  //     new BabelFishDetails(
  //       // '0x499bB1355B36aDeb93706B08A897CE6022de6aC9',
  //       '0x0Fd0d8D78Ce9299Ee0e5676a8d51F938C234162c',
  //       '0x5BB6De260127306741D93dB9D92079499F09e452',
  //       'ETHs',
  //     ),
  //   ),
  // new AssetDetails(
  //   Asset.SOV,
  //   'SOV',
  //   'SOV',
  //   sovIcon,
  //   18,
  //   new Map([
  //     [
  //       NetworkChainId.RSK_TESTNET,
  //       '0x6a9A07972D07E58f0daF5122D11e069288A375fB'.toLowerCase(),
  //     ],
  //     [
  //       NetworkChainId.BSC_TESTNET,
  //       '0x167e3cd9c626dcd642eed6d791d69e6982a5f50a'.toLowerCase(),
  //     ],
  //   ]),
  // ).setSymbols(
  //   new Map<NetworkChainId, string>([[NetworkChainId.BSC_TESTNET, 'bSOV']]),
  // ),
  // new AssetDetails(
  //   Asset.DAI,
  //   'DAI',
  //   'DAI',
  //   daiIcon,
  //   18,
  //   new Map([
  //     [
  //       NetworkChainId.RSK_TESTNET,
  //       '0x2b17f1c780b230Ec150bb52EA401F14F0cdb1449'.toLowerCase(),
  //     ],
  //     [
  //       NetworkChainId.BSC_TESTNET,
  //       '0x83241490517384cb28382bdd4d1534ee54d9350f'.toLowerCase(),
  //     ],
  //   ]),
  // ).setSymbols(
  //   new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'DAIbs']]),
  // ),
  // new AssetDetails(
  //   Asset.USDC,
  //   'USDC',
  //   'USDC',
  //   usdcIcon,
  //   18,
  //   new Map([
  //     [
  //       NetworkChainId.RSK_TESTNET,
  //       '0xA839c6F6b3C636CDD34F72AD830Cde42e651076E'.toLowerCase(),
  //     ],
  //     [
  //       NetworkChainId.BSC_TESTNET,
  //       '0x0b654c687dc8b828139406c070e0a34486e5072b'.toLowerCase(),
  //     ],
  //   ]),
  // ).setSymbols(
  //   new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'USDCbs']]),
  // ),
  // new AssetDetails(
  //   Asset.USDT,
  //   'USDT',
  //   'USDT',
  //   usdtIcon,
  //   18,
  //   new Map([
  //     [
  //       NetworkChainId.RSK_TESTNET,
  //       '0x68c10be7bA4Ecb3e5Adb0B100D75061BD76B9411'.toLowerCase(),
  //     ],
  //     [
  //       NetworkChainId.BSC_TESTNET,
  //       '0x268e3bf855cbcdf8fe31ba3557a554ab2283351f'.toLowerCase(),
  //     ],
  //   ]),
  // ).setSymbols(
  //   new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'USDTbs']]),
  // ),
];
