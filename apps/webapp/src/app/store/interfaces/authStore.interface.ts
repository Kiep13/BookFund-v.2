import { IAccount } from '@core/interfaces';

export interface IAuthStore {
  value: {
    user: IAccount | null,
    token: string,
    isAuthorized: boolean
  }
}
