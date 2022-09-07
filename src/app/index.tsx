/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GlobalStyle } from 'styles/global-styles';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

// import { useMaintenance } from './hooks/useMaintenance';
import {
  actions as maintenanceActions,
  maintenanceSlice,
  reducer as maintenanceReducer,
} from 'store/global/maintenance-store/slice';
import { maintenanceStateSaga } from 'store/global/maintenance-store/saga';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { MaintenancePage } from './containers/MaintenancePage/Loadable';
import { BridgePage } from './containers/BridgePage/Loadable';

export function App() {
  useInjectReducer({ key: maintenanceSlice, reducer: maintenanceReducer });
  useInjectSaga({ key: maintenanceSlice, saga: maintenanceStateSaga });
  const dispatch = useDispatch();

  // const { checkMaintenance, States } = useMaintenance();
  // const siteLocked = checkMaintenance(States.BRIDGE);
  const siteLocked = true;

  useEffect(() => {
    dispatch(maintenanceActions.fetchMaintenance());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s | Sovryn" defaultTitle="Sovryn" />
      {siteLocked ? (
        <MaintenancePage />
      ) : (
        <Switch>
          <Route exact path="/" component={BridgePage} />
          <Route component={NotFoundPage} />
        </Switch>
      )}
      <GlobalStyle />
    </BrowserRouter>
  );
}
