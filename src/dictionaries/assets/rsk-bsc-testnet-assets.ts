import { AssetDetails } from '../../models/AssetDetails';
import { BabelFishDetails } from '../../models/BabelFishDetails';
import { Asset, NetworkChainId } from '../../types';
import bnbIcon from '../../assets/tokens/bnb.svg';
import daiIcon from '../../assets/tokens/dai.svg';
import usdcIcon from '../../assets/tokens/usdc.svg';
import usdtIcon from '../../assets/tokens/usdt.svg';
import ethIcon from '../../assets/tokens/eth.svg';
import busdIcon from '../../assets/tokens/busd.svg';

export const rskBscTestnetAssets = [
  new AssetDetails(
    Asset.BNB,
    'BNB',
    'BNB',
    bnbIcon,
    18,
    new Map([
      [
        NetworkChainId.RSK_TESTNET,
        '0xafa6A1eb7E2282E8854822d2bB412b6db2cabA4E'.toLowerCase(),
      ],
      [
        NetworkChainId.BSC_TESTNET,
        '0x68bD35422b457f315AA176743325a9F7C9830c68'.toLowerCase(),
      ],
    ]),
  )
    .setNativeCoins(
      new Map<NetworkChainId, boolean>([[NetworkChainId.BSC_TESTNET, true]]),
    )
    .setSymbols(
      new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'bsBNB']]),
    ),
  new AssetDetails(
    Asset.DAI,
    'DAI',
    'DAI',
    daiIcon,
    18,
    new Map([
      [
        NetworkChainId.RSK_TESTNET,
        '0x407ff7d4760d3a81b4740d268eb04490c7dfe7f2'.toLowerCase(),
      ],
      [
        NetworkChainId.BSC_TESTNET,
        '0x83241490517384cb28382bdd4d1534ee54d9350f'.toLowerCase(),
      ],
    ]),
  ).setSymbols(
    new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'bsDAI']]),
  ),
  new AssetDetails(
    Asset.USDC,
    'USDC',
    'USDC',
    usdcIcon,
    18,
    new Map([
      [
        NetworkChainId.RSK_TESTNET,
        '0x3e2cf87e7ff4048a57f9cdde9368c9f4bfb43adf'.toLowerCase(),
      ],
      [
        NetworkChainId.BSC_TESTNET,
        '0x0b654c687dc8b828139406c070e0a34486e5072b'.toLowerCase(),
      ],
    ]),
  ).setSymbols(
    new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'bsUSDC']]),
  ),
  new AssetDetails(
    Asset.USDT,
    'USDT',
    'USDT',
    usdtIcon,
    18,
    new Map([
      [
        NetworkChainId.RSK_TESTNET,
        '0x43bc3f0ffff6c9bbf3c2eafe464c314d43f561de'.toLowerCase(),
      ],
      [
        NetworkChainId.BSC_TESTNET,
        '0x268e3bf855cbcdf8fe31ba3557a554ab2283351f'.toLowerCase(),
      ],
    ]),
  ).setSymbols(
    new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'bsUSDT']]),
  ),
  new AssetDetails(
    Asset.BUSD,
    'BUSD',
    'BUSD',
    busdIcon,
    18,
    new Map([
      [
        NetworkChainId.RSK_TESTNET,
        '0x137BEc8c83740920ebc4f29f51C7B65b75Beec83'.toLowerCase(),
      ],
      [
        NetworkChainId.BSC_TESTNET,
        '0x8c9abb6c9d8d15ddb7ada2e50086e1050ab32688'.toLowerCase(),
      ],
    ]),
  ).setSymbols(
    new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'bsBUSD']]),
  ),
  new AssetDetails(
    Asset.ETH,
    'ETH',
    'ETH',
    ethIcon,
    18,
    new Map([
      [
        NetworkChainId.RSK_TESTNET,
        '0x793CE6F95912D5b43532c2116e1b68993d902272'.toLowerCase(),
      ],
      [
        NetworkChainId.BSC_TESTNET,
        '0x7d1FE4FdB0Afaf26ada5083A688139EbA10d3e1B'.toLowerCase(),
      ],
    ]),
  )
    .setSymbols(
      new Map<NetworkChainId, string>([[NetworkChainId.RSK_TESTNET, 'bsETH']]),
    )
    .setBabelFish(
      new BabelFishDetails(
        '0x0fd0D8D78CE9299eE0e5676A8D51f938c234162c',
        '0x04D92DaA8f3Ef7bD222195e8D1DbE8D89A8CebD3',
        'ETHs',
      ),
    ),
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
];
