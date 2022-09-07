import { createLocationList} from './locationList';
import { IPlansServices } from '../../../services/plan_services';


export const createLocationListPage = ( services: { plansServices: IPlansServices }) => {
  
  const LocationListPage = createLocationList(services);

  return () => <LocationListPage />;

}