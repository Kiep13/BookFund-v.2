import { Roles } from '@core/enums';

export interface IAccount {
  name: string,
  surname: string,
  image: string,
  role: Roles
}
