import { AlertTypes } from '../enums';

export interface IAlert {
  id: number,
  type: AlertTypes,
  message: string,
  delay: number,
  closable: boolean,
}
