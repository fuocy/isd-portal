import { LayoutHOC } from 'base/ui/layout/layout';
import { createPurchaseOrder} from './purchaseOrder';
import { IPlansServices } from '../../../services/plan_services';
export const createPurchaseOrderPage = ( services: { plansServices: IPlansServices }) => {
 
  const PurchaseOrderPage = createPurchaseOrder(services);

  return () => <PurchaseOrderPage />;

}