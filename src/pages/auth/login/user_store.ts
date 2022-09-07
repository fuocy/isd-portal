import { observable, runInAction } from 'mobx';
import { Company, ICompanyServices,saleORG,Menu,ChildMenu } from 'services/company_list_services';
import { clearUserSession, setUserSession } from "utils/localStorageHelper";
import  * as services from './service';
import { useNavigate } from "react-router-dom";
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();
export type CompanyStore = {
  companies: Array<Company>,
  login: {
    webPermission:  {
      menuModel: Array<Menu>,
      moduleModel: Array<Company>,
      pageModel: Array<ChildMenu>,
    },
    userName:string
  },
  saleOrg:Array<saleORG>
  
}

export interface ICompanyPresenter {
  createStore(): CompanyStore,
  getCompanies(store: CompanyStore,username:string): Promise<void>;
  login(store: CompanyStore,data:object): Promise<void>;
  getSaleORG(store:CompanyStore,username:string,companyCode:string):Promise<void>;
  signOut():Promise<void>
}

export function createCompanyPresenter({
  companyServices
}: {
  companyServices: ICompanyServices
}): ICompanyPresenter {
 
  return {
    createStore: (): CompanyStore => observable({ companies: [],login:{webPermission:{menuModel:[],moduleModel:[],pageModel:[]}, userName:''},saleOrg:[] }),
    getCompanies: async (store: CompanyStore,username:string) => {
      try {
        const companies = await services.companyList(username);

        runInAction(() => {
          store.companies = companies.data;
        })
      } catch {
        // error
      }
    },
    getSaleORG:async(store: CompanyStore,username:string,companyCode:string)=>{
      try{
        const saleOrg = await services.saleORG(username, companyCode);
          runInAction(() => {
          store.saleOrg = saleOrg.data;
        })
      }catch{

      }
    },
    login: async (store: CompanyStore,data:object) => {
      try {
        const result = await services.login(data);
        console.log(result)
        runInAction(() => {
          store.login = result.data;
      
          const userSession = {
            accountId: result.data.accountId,
            userName: result.data.userName,
            companyCode: result.data.companyCode,
            companyId: result.data.companyId,
            companyName: result.data.companyName,
            expiredTime: result.data.expiredTime,
            saleOrg: result.data.saleOrg,
            saleOrgName: result.data.saleOrgName,
            validaty: result.data.validaty,
            roles: result.data.roles,
            role: result.data.role,
            token: result.data.token,
            refreshToken: result.data.refreshToken,
            webPermission: result.data.webPermission,
          };
          setUserSession(userSession);
        
        })
        history.push('/');
        window.location.reload();
      
      } catch {
        // error
      }
    },
    signOut: async()=>{
      try{
        
        clearUserSession();
   
      }catch(e){}
    }

  }
}
