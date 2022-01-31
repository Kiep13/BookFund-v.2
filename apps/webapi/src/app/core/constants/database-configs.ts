import { Account } from '@entities/account.entity';
import { Author } from '@entities/author.entity';
import { environment} from '@environments/environment';

export const DATABASE_CONFIGS: any = {
  type: 'postgres',
  database: environment.databaseName,
  synchronize: true,
  logging: false,
  username: environment.databaseUsername,
  password: environment.databasePassword,
  entities: [
    Account, Author
  ]
}
