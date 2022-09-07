import { observable, runInAction } from "mobx";
import {
  IPlansServices,
  PurchaseOder,
  PurchaseOderDetails,
  BarcodePurchaseOder,
} from "../../../services/plan_services";
import * as service from "../service";

export type PurchaseOderStore = {
  dataTablePurchaseOder: {
    data: Array<PurchaseOder>;
    recordsFiltered: number;
    draw: number;
    recordsTotal: number;
  };
  dataDetails: {
    details: Array<PurchaseOderDetails>;
    master: {
      actived: boolean;
      companyCode: string;
      createTime: string;
      deletionInd: string;
      documentType: string;
      lastEditTime: string;
      purchaseOrderCode: string;
      purchaseOrderId: string;
      purchasingOrg: string;
      vendorNumber: string;
    };
  };
  infoBarcodePurchaseOder: {
    data: {
      batch: string;
      description: string;
      material: number;
      wbsso: string;
    };
    barcode: string;
  };
};
export interface PurchaseOderPresenter {
  createStore(): PurchaseOderStore;
  getTablePurchaseOder(store: PurchaseOderStore, data: object): Promise<void>;
  getDetailPurchaseOder(store: PurchaseOderStore, data: any): Promise<void>;
  getBarcode(store: PurchaseOderStore, data: any): Promise<void>;
}

export function createPurchaseOderPresenter(services: {
  plansServices: IPlansServices;
}): PurchaseOderPresenter {
  return {
    createStore: (): PurchaseOderStore =>
      observable({
        dataTablePurchaseOder: {
          data: [],
          recordsFiltered: 1,
          recordsTotal: 0,
          draw: 0,
        },
        dataDetails: {
          details: [],
          master: {
            actived: true,
            companyCode: "",
            createTime: "",
            deletionInd: "",
            documentType: "",
            lastEditTime: "",
            purchaseOrderCode: "",
            purchaseOrderId: "",
            purchasingOrg: "",
            vendorNumber: "",
          },
        },
        infoBarcodePurchaseOder: {
          data: {
            batch: "",
            description: "",
            material: 0,
            wbsso: ""
          },
          barcode: "",
        },
      }),
    getTablePurchaseOder: async (store: PurchaseOderStore, data: object) => {
      try {
        const result = await service.TablePurchaseOder(data);

        runInAction(() => {
          store.dataTablePurchaseOder.data = result.data.data;
          store.dataTablePurchaseOder.recordsFiltered =
            result.data.additionalData.recordsFiltered;
          store.dataTablePurchaseOder.draw = result.data.additionalData.draw;
          store.dataTablePurchaseOder.recordsTotal =
            result.data.additionalData.recordsTotal;
        });
      } catch {}
    },
    getDetailPurchaseOder: async (
      store: PurchaseOderStore,
      PurchaseOrderId: any
    ) => {
      try {
        const result = await service.getDetailPurchaseOder(PurchaseOrderId);
        runInAction(() => {
          store.dataDetails = result.data.data;
        });
      } catch {}
    },
    getBarcode: async (
      store: PurchaseOderStore,
      PurchaseOrderDetailId: any
    ) => {
      try {
        const result = await service.getBarcodePurchaseOder(
          PurchaseOrderDetailId
        );
        runInAction(() => {
          store.infoBarcodePurchaseOder.barcode = result.data.data;
          store.infoBarcodePurchaseOder.data = result.data.additionalData;
        });
      } catch {}
    },
  };
}
