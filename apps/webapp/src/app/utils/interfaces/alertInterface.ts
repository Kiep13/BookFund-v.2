import { AlertTypes } from '../enums';

export interface IAlert {
  id: string;
  type: AlertTypes;
  message: string;
  delay: number;
  closable: boolean;
}
