import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { Roles } from '../app/core/enums';

export class createAccountTable1643225882424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'account',
        columns: [
          {
            name: 'id',
            type: 'int8',
            isPrimary: true,
            isGenerated: true,
            isNullable: false
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'surname',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'activationLink',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'isActivated',
            type: 'boolean',
            default: 'false'
          },
          {
            name: 'role',
            type: 'enum',
            enum: [Roles.USER, Roles.MODERATOR, Roles.ADMIN],
            enumName: 'rolesEnum',
            isNullable: false
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
