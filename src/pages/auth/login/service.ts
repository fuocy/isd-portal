import { get,post } from 'utils/api';

export const companyList = async (username:string) => {

  const respone = await get(`Permission/Auth/GetListCompanyByUsername?username=${username}`);
  return respone;
}
export const login = async (data:any) => {
  
  const respone = await post(`Permission/Auth/Authenticate`, data );
  return respone;
}

export const saleORG = async (userName:string,companyCode:string) => {
    
  const respone = await get(`Permission/Auth/GetSaleOrgByCompanyCode?CompanyCode=${companyCode}&UserName=${userName}`);
  return respone;
}