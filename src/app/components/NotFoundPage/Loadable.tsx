/**
 * Asynchronously loads the component for NotFoundPage
 */

import React from 'react';
import { lazyLoad } from 'utils/loadable';
import { PageSkeleton } from '../PageSkeleton';

export const NotFoundPage = lazyLoad(
  () => import('./index'),
  module => module.NotFoundPage,
  { fallback: <PageSkeleton /> },
);
