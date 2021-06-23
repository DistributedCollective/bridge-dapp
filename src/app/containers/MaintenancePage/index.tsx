import React from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components/macro';

import logoSvg from 'assets/images/sovryn-logo-white.svg';
import { media } from 'styles/media';
import { translations } from 'locales/i18n';
import { discordInvite } from 'utils/network-utils';

export function MaintenancePage(props) {
  return (
    <div
      className="items-center flex justify-center"
      style={{ height: '100vh' }}
    >
      <div className="text-center">
        <StyledLogo src={logoSvg} className="mx-auto mb-4" />
        <div className="text-xl">
          <Trans
            i18nKey={translations.maintenance.full}
            components={[
              <a href={discordInvite} target="_blank" rel="noreferrer noopener">
                x
              </a>,
            ]}
          />
        </div>
      </div>
    </div>
  );
}

const StyledLogo = styled.img.attrs(_ => ({
  alt: '',
}))`
  width: 345px;
  height: 75px;
  ${media.large`
    width: 426px;
    height: 72px;
  `}
`;
