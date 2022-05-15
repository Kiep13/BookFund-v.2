import { IAccount } from './accountInterface';

export interface IAuthResponse {
  account: IAccount;
  accessToken: string;
  refreshToken: string;
}
