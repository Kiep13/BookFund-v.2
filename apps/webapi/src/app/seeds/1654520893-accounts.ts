import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

const accounts =  require('../seeds-json/accounts.json');

export default class AddAccounts implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('account', ['email', 'name', 'surname', 'provider', 'role'])
      .values([
        ...accounts
      ])
      .execute();
  }
}
