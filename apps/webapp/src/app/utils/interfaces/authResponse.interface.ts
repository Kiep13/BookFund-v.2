import { IAccount } from './account.interface';

export interface IAuthResponse {
  account: IAccount,
  accessToken: string,
  refreshToken: string
}
