import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import styles from './index.module.css';

export function Logo() {
  const { t } = useTranslation();
  return (
    <div className="mb-12">
      <Link to="/" className={cn('mx-auto block mb-2', styles.logo)}>
        <span className="sr-only">Sovryn</span>
      </Link>
      <h1
        className={cn(
          'mx-auto my-0 block uppercase text-center text-xl font-extrabold leading-1',
          styles.title,
        )}
      >
        {t(translations.title)}
      </h1>
    </div>
  );
}
