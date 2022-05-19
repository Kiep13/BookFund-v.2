import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class createFolderTable1652938103042 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'folder',
      columns: [
        {
          name: 'id',
          type: 'int8',
          isPrimary: true,
          isGenerated: true,
          isNullable: false
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'accountId',
          type: 'int8',
          isNullable: false
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          isNullable: true,
          default: 'now()'
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          isNullable: true,
          default: 'now()'
        }
      ]
    }), true);

    await queryRunner.createForeignKey('folder', new TableForeignKey({
      columnNames: ['accountId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'account',
      onDelete: 'CASCADE'
    }));

    await queryRunner.createIndex('folder', new TableIndex({
      name: 'TABLE_FOLDER_INDEX_ACCOUNT_ID',
      columnNames: ['accountId']
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
