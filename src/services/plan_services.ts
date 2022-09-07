
export type PurchaseOder = {
  stt: "string";
  purchaseOrderCode: "string";
  companyCode: "string";
  documentType: "string";
  deletionInd: "string";
  vendorNumber: "string";
  purchasingOrg: "string";
  createTime: "string";
  lastEditTime: "string";
  active: "string";
  purchaseOrderId: "string";
};
export type PurchaseOderDetails = {
  acctAssgmtCat: "string";
  cumulativeQuantity: number;
  cumulativeQuantityInt: number;
  deletionInd: string;
  delivCompl: string;
  goodsReceipt: string;
  item: number;
  itemCategory: string;
  material: string;
  orderUnit: string;
  plant: string;
  poItem: string;
  poItemInt: number;
  poQuantity: number;
  purchaseOrderCode: string;
  purchaseOrderDetailId: string;
  purchaseOrderId: string;
  sdDocument: string;
  shortText: string;
  storageLocation: string;
  wbsElement: number;
};
export type Location = {
  stt: number;
  plant: String;
  sloc: string;
  warehouseNo: string;
  storageType: string;
  storageBin: string;
  actived: boolean;
  lastEditTime: string;
  createTime: string;
};
export type BarcodeLocation = {
  
}
export type BarcodePurchaseOder={
  
}
export interface IPlansServices {}
export function createPlansServices(): IPlansServices {
  return {};
}
