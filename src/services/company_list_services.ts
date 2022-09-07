
export type Company = {
    companyCode: string,
    companyName: string,
    webPermission:[]

  }
  export type Menu={
    menuId:string,
    icon:string,
    menuName:string,

  }
  export type ChildMenu={
    menuId:string,
    icon:string,
    pageName:string,
    pageId:string,
    pageUrl:string

  }
  export type User = {
  userName:string,
  }
  export type saleORG = {
    [key: string]: any;
    saleOrgCode: string,
    storeName: string,
  }
  export interface ICompanyServices {
  

  
  }
  
  export function createCompanyServices(): ICompanyServices {
    return {

  
    }
  }
  