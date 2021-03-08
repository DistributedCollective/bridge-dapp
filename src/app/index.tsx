/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { DEFAULT_CHAIN } from '../utils/helpers';
import { BlockChainProvider } from './containers/BlockChainProvider';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { BridgePage } from './containers/BridgePage/Loadable';

export function App() {
  console.log(`FOR CHAIN ${DEFAULT_CHAIN}`);
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s | Sovryn" defaultTitle="Sovryn" />
      <BlockChainProvider>
        <Switch>
          <Route exact path="/" component={BridgePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BlockChainProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}
