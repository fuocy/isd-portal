import { createPurchaseOrderDetail} from './purchaseOrderDetail';
import { IPlansServices } from '../../../../services/plan_services';


export const createPurchaseOrderDetailPage = ( services: { plansServices: IPlansServices }) => {
 
  const PurchaseOrderDetailPage = createPurchaseOrderDetail(services);

  return () => <PurchaseOrderDetailPage />;

}