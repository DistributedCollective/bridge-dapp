import { useSelector } from 'react-redux';
import { selectMaintenance } from 'store/global/maintenance-store/selectors';
import { MaintenanceStates } from 'store/global/maintenance-store/types';

// items and values should match those from Maintenance db table
enum States {
  //dapp states not used in bridge
  BRIDGE = 'bridge',
  // ETH_BRIDGE = 'ethBridge',
  // BSC_BRIDGE = 'bscBridge',
}

type MaintenanceResult = {
  [key in States]: boolean;
};

export function useMaintenance() {
  const maintenanceStates: MaintenanceStates = useSelector(selectMaintenance);

  const checkMaintenance = (name: States): boolean => {
    return true;
    return maintenanceStates[name]?.maintenance_active;
  };

  const checkMaintenances = (): MaintenanceResult =>
    Object.keys(maintenanceStates).reduce(
      (res, curr) =>
        Object.assign(res, {
          [curr]: maintenanceStates[curr]?.maintenance_active,
        }),
      {} as MaintenanceResult,
    );

  return { checkMaintenance, checkMaintenances, States };
}
