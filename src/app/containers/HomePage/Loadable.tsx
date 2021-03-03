/**
 * Asynchronously loads the component for HomePage
 */

import React from 'react';
import { lazyLoad } from 'utils/loadable';
import { PageSkeleton } from '../../components/PageSkeleton';

export const HomePage = lazyLoad(
  () => import('./index'),
  module => module.HomePage,
  { fallback: <PageSkeleton /> },
);
