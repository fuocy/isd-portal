import { LayoutHOC } from 'base/ui/layout/layout';
import { createVendor} from './vendor';
import { IPlansServices } from '../../../services/plan_services';
export const createVendorListPage = ( services: { plansServices: IPlansServices }) => {
 
  const VendorPage = createVendor(services);

  return () => <VendorPage />;

}