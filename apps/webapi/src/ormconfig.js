const {environment} = require("./environments/environment");

module.exports = {
  "type": "postgres",
  "host": environment.databaseUrl || "localhost",
  "port": 5432,
  "username": environment.databaseUsername,
  "password": environment.databasePassword,
  "database": environment.databaseName,
  "entities": ["app/entity/*.ts"],
  "migrationsTableName": "migrations",
  "migrations": ["migrations/*.ts"],
  "seeds": ["app/seeds/**/*.ts"],
  "cli": {
    "migrationsDir": "migrations"
  }
}
