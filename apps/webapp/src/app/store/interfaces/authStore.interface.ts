import { IAccount } from '@core/interfaces';

export interface IAuthStore {
  value: {
    user: IAccount | null,
    isAuthorized: boolean
  }
}
