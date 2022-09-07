import { IServices } from 'services/services';
import { createHomePage } from './home/create';
import { createPurchaseOrderPage } from './plans/purchaseOrder/create';
import { createPurchaseOrderDetailPage } from '../pages/plans/purchaseOrder/purchaseOrderDetail/create';
import { createLocationListPage } from './plans/listLocation/create';
import {createPrintBarcodeLocationPage} from './plans/listLocation/printBarcodeLocation/create'
import { createPrintBarcodePurchaseOderPage } from './plans/purchaseOrder/printBarcodePurchaseOder/create';
import { createVendorListPage } from './plans/vendor/create';
export function createPages( services: IServices) {

  return {
    HomePage: createHomePage(),
    PurchaseOrderPage:createPurchaseOrderPage(services),
    PurchaseOrderDetailPage:createPurchaseOrderDetailPage(services),
    LocationListPage:createLocationListPage(services),
    PrintBarcodeLocation:createPrintBarcodeLocationPage(services),
    PrintBarcodePurchaseOderPage:createPrintBarcodePurchaseOderPage(services),
    VendorListPage:createVendorListPage(services )
  }
}