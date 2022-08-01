import { Request } from 'express';

import { AccountEntity } from '@entities/account.entity';

export interface ICustomRequest extends Request<any, any, any, any> {
  account: AccountEntity;
  files: any;
}
