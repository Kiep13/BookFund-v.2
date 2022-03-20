import { AuthProviders, Roles } from '@core/enums';

export interface IAccount {
  name: string,
  surname: string,
  email: string,
  image: string,
  role: Roles,
  provider: AuthProviders
}
