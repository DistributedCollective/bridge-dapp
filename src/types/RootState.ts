import { BlockChainProviderState } from 'app/containers/BlockChainProvider/types';
import { PreDepositFlowState } from 'app/containers/PreDepositFlow/types';
import { BridgePageState } from 'app/containers/BridgePage/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  blockChainProvider?: BlockChainProviderState;
  preDepositFlow?: PreDepositFlowState;
  bridgePage?: BridgePageState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
