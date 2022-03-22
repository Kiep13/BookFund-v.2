import { IAccount } from '@utils/interfaces';

export interface IAuthStore {
  value: {
    user: IAccount | null,
    token: string,
    isAuthorized: boolean
  }
}
