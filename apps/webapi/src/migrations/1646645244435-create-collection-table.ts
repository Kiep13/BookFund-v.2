 import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class createCollectionTable1646645244435 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'collection',
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
            name: 'subtitle',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'description',
            type: 'text',
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
