import { Roles } from '@utils/enums';

export interface IUser {
  id: number;
  fullName: string;
  name: string;
  surname: string;
  image: string;
  provider: string;
  role: Roles;
  createdAt: string;
}
