// import { createCompanyServices, ICompanyServices } from "./company_services";
import { createUserServices, IUserServices } from "./user_services";
import {createCompanyServices, ICompanyServices } from "./company_list_services";
import {createPlansServices, IPlansServices } from "./plan_services";

export interface IServices {
  companyServices: ICompanyServices,
  userServices: IUserServices,
  plansServices:IPlansServices
  // locationServices:
}

export function createServices(url: string): IServices {

  return {
    companyServices: createCompanyServices(),
    userServices: createUserServices(url),
    plansServices: createPlansServices(),
  }
}
