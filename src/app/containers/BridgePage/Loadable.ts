/**
 *
 * Asynchronously loads the component for BridgePage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const BridgePage = lazyLoad(
  () => import('./index'),
  module => module.BridgePage,
);
