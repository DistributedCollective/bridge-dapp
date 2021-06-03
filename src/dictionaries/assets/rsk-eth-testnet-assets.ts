import { AssetDetails } from '../../models/AssetDetails';
import { Asset, NetworkChainId } from '../../types';
import usdtIcon from '../../assets/tokens/usdt.svg';
import { BabelFishDetails } from '../../models/BabelFishDetails';

export const rskEthTesnetAssets = [
  new AssetDetails(
    Asset.XUSD,
    'XUSD',
    'XUSD',
    usdtIcon,
    18,
    new Map([
      [
        NetworkChainId.RSK_TESTNET,
        '0xa1F7EfD2B12aBa416f1c57b9a54AC92B15C3A792'.toLowerCase(),
      ],
    ]),
  ).setBabelFish(
    new BabelFishDetails(
      // '0x499bB1355B36aDeb93706B08A897CE6022de6aC9',
      '0x0Fd0d8D78Ce9299Ee0e5676a8d51F938C234162c',
      '0x5BB6De260127306741D93dB9D92079499F09e452',
      'ETHs',
    ),
  ),
  // new AssetDetails(
  //   Asset.ETH,
  //   'ETH',
  //   'ETH',
  //   ethIcon,
  //   18,
  //   new Map([
  //     [
  //       NetworkChainId.RSK_TESTNET,
  //       '0x4F2Fc8d55c1888A5AcA2503e2F3E5d74eef37C33'.toLowerCase(),
  //     ],
  //     [
  //       NetworkChainId.ETH_TESTNET,
  //       '0xa1F7EfD2B12aBa416f1c57b9a54AC92B15C3A792'.toLowerCase(),
  //     ],
  //   ]),
  // )
  //   .setSymbols(
  //     new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'esETH']]),
  //   )
  //   .setNativeCoins(
  //     new Map<NetworkChainId, boolean>([[NetworkChainId.ETH_TESTNET, true]]),
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
  //       NetworkChainId.ETH_TESTNET,
  //       '0xce887e72f26b61c3ddf45bd6e65abbd58437ab04'.toLowerCase(),
  //     ],
  //   ]),
  // ).setSymbols(
  //   new Map<NetworkChainId, string>([[NetworkChainId.ETH_TESTNET, 'eSOV']]),
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
  //       '0xcb92C8D49Ec01b92F2A766C7c3C9C501C45271E0'.toLowerCase(),
  //     ],
  //     [
  //       NetworkChainId.ETH_TESTNET,
  //       '0x974cf21396D4D29F8e63Ac07eCfcbaB51a739bc9'.toLowerCase(),
  //     ],
  //   ]),
  // ).setSymbols(
  //   new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'DAIes']]),
  // ),
  // new AssetDetails(
  //   Asset.USDC,
  //   'USDC',
  //   'USDC',
  //   usdcIcon,
  //   6,
  //   new Map([
  //     [
  //       NetworkChainId.RSK_TESTNET,
  //       '0xcc8Eec21ae75F1A2dE4aC7b32A7de888a45cF859'.toLowerCase(),
  //     ],
  //     [
  //       NetworkChainId.ETH_TESTNET,
  //       '0x4C68058992b8aD1243eE23A5923023C0e15Cf43F'.toLowerCase(),
  //     ],
  //   ]),
  // )
  //   .setSymbols(
  //     new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'USDCes']]),
  //   )
  //   .setDecimals(
  //     new Map<NetworkChainId, number>([[NetworkChainId.RSK_TESTNET, 18]]),
  //   ),
  // new AssetDetails(
  //   Asset.USDT,
  //   'USDT',
  //   'USDT',
  //   usdtIcon,
  //   6,
  //   new Map([
  //     [
  //       NetworkChainId.RSK_TESTNET,
  //       '0x10C5A7930fC417e728574E334b1488b7895c4B81'.toLowerCase(),
  //     ],
  //     [
  //       NetworkChainId.ETH_TESTNET,
  //       '0xff364ffa4962cb172203a5be01d17cf3fef02419'.toLowerCase(),
  //     ],
  //   ]),
  // )
  //   .setSymbols(
  //     new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'USDTes']]),
  //   )
  //   .setDecimals(
  //     new Map<NetworkChainId, number>([[NetworkChainId.RSK_TESTNET, 18]]),
  //   ),
];
