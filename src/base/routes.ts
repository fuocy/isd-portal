

export const COMPANY_ROUTES = {
  BASE: 'company/*',
  LIST_COMPANY: {
    LINK: 'company/',
    PATH: '',
  },
  NEW_COMPANY: {
    LINK: 'company/new',
    PATH: 'new',
  },
}

export const ROUTES = {
  HOME: 'dashboard/',
  ABOUT: {
    BASE: 'about/*',
    LINK: 'about',
    PATH: 'about',
  },
  COMPANY: COMPANY_ROUTES,
}
