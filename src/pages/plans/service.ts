import { get, post } from "utils/api";

export const DateDocument = async (result: string) => {
  const respone = await get(
    `Utilities/CommonDate/GetDateByCommonDate?CommonDate=${result}`
  );
  return respone;
};
export const TablePurchaseOder = async (data: any) => {
  const respone = await post(`MES/PurchaseOrder/Search`, data);
  return respone;
};

export const getDetailPurchaseOder = async (purchaseOrderId: any) => {
  const respone = await get(
    `MES/PurchaseOrder/GetDetail?PurchaseOrderId=${purchaseOrderId}`
  );
  return respone;
};
export const getBarcodePurchaseOder = async (PurchaseOrderDetailId: any) => {
  const respone = await get(
    `MES/PurchaseOrder/GetBarcode?PurchaseOrderDetailId=${PurchaseOrderDetailId}`
  );
  return respone;
};
export const searchLocation = async (data: any) => {
  const respone = await post(`MES/StorageBin/Search`, data);
  return respone;
};
export const getBarcode = async (storageBinId: any) => {
  const respone = await get(
    `MES/StorageBin/GetBarcode?StorageBinId=${storageBinId}`
  );
  return respone;
};

export const searchVendor = async (data: any) => {
  const respone = await post(`MES/Vendor/Search`, data);
  return respone;
};