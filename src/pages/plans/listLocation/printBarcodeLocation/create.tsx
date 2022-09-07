import { createPrintBarcodeLocation} from './printBarcodeLocation';
import { IPlansServices } from '../../../../services/plan_services';


export const createPrintBarcodeLocationPage = ( services: { plansServices: IPlansServices }) => {
  
  const PrintBarcodeLocationPage  = createPrintBarcodeLocation(services);

  return () => <PrintBarcodeLocationPage  />;

}