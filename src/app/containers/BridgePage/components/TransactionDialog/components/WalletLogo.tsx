import React from 'react';
import { getWalletImage, getWalletName } from '../utils';
import { WalletLogoContainer, WalletLogoImage } from '../styled';

interface IWalletLogoProps {
  wallet: string;
}

export const WalletLogo: React.FC<IWalletLogoProps> = ({ wallet }) => {
  return (
    <WalletLogoContainer>
      <WalletLogoImage src={getWalletImage(wallet)} alt="Wallet" />
      <div className="text-nowrap text-truncate">{getWalletName(wallet)}</div>
    </WalletLogoContainer>
  );
};
