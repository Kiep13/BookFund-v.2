import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class createArticleTable1653109403401 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'article',
      columns: [
        {
          name: 'id',
          type: 'int8',
          isPrimary: true,
          isGenerated: true,
          isNullable: false
        },
        {
          name: 'title',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'contentFileUrl',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'isRedirecting',
          type: 'bool',
          isNullable: false
        },
        {
          name: 'exactUrl',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'hostUrl',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'folderId',
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

    await queryRunner.createForeignKey('article', new TableForeignKey({
      columnNames: ['folderId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'folder',
      onDelete: 'CASCADE'
    }));

    await queryRunner.createIndex('article', new TableIndex({
      name: 'TABLE_ARTICLE_INDEX_FOLDER_ID',
      columnNames: ['folderId']
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
