import { Account } from '../../entity/account.entity';

export const DATABASE_CONFIGS: any = {
  type: 'postgres',
  database: 'bookfund',
  synchronize: true,
  logging: false,
  username: 'admin',
  password: 'admin',
  entities: [
    Account
  ]
}
