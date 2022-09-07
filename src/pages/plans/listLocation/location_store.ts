import { observable, runInAction } from "mobx";
import * as service from "../service";
import { IPlansServices, Location,BarcodeLocation } from "../../../services/plan_services";
export type LocationStore = {
  locationData: {
    data: Array<Location>;
    recordsFiltered: number;
    recordsTotal: number;
    draw: number;
  };
  infoBarcode:{
    data:string;
  }
};
export interface ILocationPresenter {
  createStore(): LocationStore;
  location(store: LocationStore,data: any): Promise<void>;
  getBarcode(store: LocationStore,data: any): Promise<void>;
}

export function createLocationPresenter(services: {
  plansServices: IPlansServices;
}): ILocationPresenter {
  return {
    createStore: (): LocationStore =>
      observable({
        locationData: {
          data:[],
          recordsFiltered: 1,
          recordsTotal: 0,
          draw: 0,
        },
        infoBarcode:{
          data:'',
        }
      }),
    location: async (store: LocationStore, data: any) => {
    
      try {
        const result = await service.searchLocation(data);
        console.log(result )
        runInAction(() => {
          store.locationData.data = result.data.data;
          store.locationData.recordsTotal =
            result.data.additionalData.recordsFiltered;
        });
      } catch {
        // error
      }
    },
    getBarcode: async (store: LocationStore, id: any) => {

      try {
        const result = await service.getBarcode(id);
        runInAction(() => {
         store.infoBarcode= result.data
        });
      } catch {
        // error
      }
    },
  };
}
