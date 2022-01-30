import { Connection } from 'typeorm';

let connection: Connection;

function setConnection(value: Connection) {
  connection = value;
}

export {
  connection,
  setConnection
}
