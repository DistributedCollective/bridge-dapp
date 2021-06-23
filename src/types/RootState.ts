import { BridgePageState } from 'app/containers/BridgePage/types';
import { MaintenanceStoreState } from 'store/global/maintenance-store/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  bridgePage?: BridgePageState;
  maintenanceState?: MaintenanceStoreState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
