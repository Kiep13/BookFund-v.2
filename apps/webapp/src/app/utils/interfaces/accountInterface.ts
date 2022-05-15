import { Roles } from '@utils/enums';

export interface IAccount {
  name: string;
  surname: string;
  image: string;
  role: Roles;
}
