import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Roles } from '@core/enums';

@Entity({
  name: 'account'
})
export class AccountEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int8'
  })
  id: number;

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true
  })
  email: string;

  @Column({
    name: 'name',
    type: 'varchar'
  })
  name: string;

  @Column({
    name: 'surname',
    type: 'varchar'
  })
  surname: string;

  @Column({
    name: 'image',
    type: 'varchar',
    nullable: true
  })
  image: string;

  @Column({
    name: 'role',
    type: 'enum',
    enumName: 'rolesEnum',
    enum: Roles,
    default: Roles.USER
  })
  role: Roles;

  @Column({
    name: 'createdAt',
    type: 'timestamp',
    nullable: true,
    insert: true,
    default: new Date()
  })
  createdAt: Date;

  @Column({
    name: 'updatedAt',
    type: 'timestamp',
    nullable: true,
    update: true,
    default: new Date()
  })
  updatedAt: Date;
}

