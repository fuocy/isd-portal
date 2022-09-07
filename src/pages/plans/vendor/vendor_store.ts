import { observable, runInAction } from "mobx";
import * as service from "../service";
import { IPlansServices } from "../../../services/plan_services";
export type VendorStore = {
  dataVendorList: {
    data: Array<Location>;
    recordsFiltered: number;
    recordsTotal: number;
    draw: number;
  };
};
export interface IVendorPresenter {
  createStore(): VendorStore;
  getVenderList(store: VendorStore, data: any): Promise<void>;
}

export function createVendorPresenter(services: {
  plansServices: IPlansServices;
}): IVendorPresenter {
  return {
    createStore: (): VendorStore =>
      observable({
        dataVendorList: {
          data: [],
          recordsFiltered: 1,
          recordsTotal: 0,
          draw: 0,
        },
      }),

    getVenderList: async (store: VendorStore, data: any) => {
      try {
        const result = await service.searchVendor(data);
        runInAction(() => {
          store.dataVendorList.data = result.data.data;
          store.dataVendorList.recordsTotal =
            result.data.additionalData.recordsFiltered;
        });
      } catch {
        // error
      }
    },
  };
}
