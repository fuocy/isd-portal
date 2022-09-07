import { observable, runInAction } from 'mobx';
import { User,Open } from 'services/user_services';
import { IUserServices } from 'services/user_services';

export type UserStore = {
  user: User | undefined,
  open:false,
}

export interface IUserPresenter {
  createStore(): UserStore,
  loadUser(id: string, store: UserStore): Promise<void>;

}

export function createUserPresenter({
  userServices
}: {
  userServices: IUserServices
}): IUserPresenter {
  return {
    createStore: (): UserStore => observable({ user: undefined,open:false }),
    loadUser: async (id: string, store: UserStore) => {
      try {
        const user = await userServices.getUser(id);
        runInAction(() => {
          store.user = user;
        })
      } catch {
        // error
      }
    }
  }
}
