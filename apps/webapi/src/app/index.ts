import {createConnection} from 'typeorm';

import { DATABASE_CONFIGS } from './core/constants';
import { Account } from './entity/account.entity';

createConnection(DATABASE_CONFIGS).then(async connection => {

  console.log("Inserting a new user into the database...");
  const account = new Account();
  account.email = `test${Date.now()}@bk.ru`;
  account.name = 'Stephen';
  account.surname = 'King';
  account.image = 'https://interesnyefakty.org/wp-content/uploads/interesnye-fakty-o-stivene-kinge.jpg';
  account.activationLink = 'mock';
  await connection.manager.save(account);
  console.log('Saved a new user with id: ' + account.id);

  console.log("Loading users from the database...");
  const accounts = await connection.manager.find(Account);
  console.log("Loaded users: ", accounts);

  console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
