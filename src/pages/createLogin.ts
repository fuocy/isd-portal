import { IServices } from 'services/services';
import { LayoutHOC } from 'base/ui/layout/layout.login';
import { createLoginPage } from './auth/create';

export function createLogin(layoutHOC: LayoutHOC, services: IServices) {

  return {

    LoginPage: createLoginPage(layoutHOC,services),
  }
}