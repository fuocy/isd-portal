
export type User = {
  id: string,
  userName: string,
  firstName: string,
  lastName: string,
}

export type Open = {
open:boolean,
}
export interface IUserServices {
  getUser(id: string): Promise<User>;
}

export function createUserServices(url: string): IUserServices {
  return {
    getUser: (id: string): Promise<User> => Promise.resolve({
      id,
      userName: 'hoainam',
      firstName: 'Hoai Nam',
      lastName: 'Vu',
    }),
  }
}
