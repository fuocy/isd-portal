import { createPrintBarcodePurchaseOder} from './printBarcodePurchaseOder';
import { IPlansServices } from '../../../../services/plan_services';

export const createPrintBarcodePurchaseOderPage= ( services: { plansServices: IPlansServices }) => {
  
    const PrintBarcodePurchaseOderPage  = createPrintBarcodePurchaseOder(services);
  
    return () => <PrintBarcodePurchaseOderPage  />;
  
  }