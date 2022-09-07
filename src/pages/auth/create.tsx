import React from 'react';
import { LayoutHOC } from 'base/ui/layout/layout.login';
import { createLogin} from './login/login'
import { ICompanyServices } from 'services/company_list_services';

export const createLoginPage = (layoutHOC: LayoutHOC,services: { companyServices: ICompanyServices }) => {

  const CompanyPage = layoutHOC(createLogin(services));

  return () => <CompanyPage />;
}


