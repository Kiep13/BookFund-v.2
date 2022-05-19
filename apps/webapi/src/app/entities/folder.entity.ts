import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AccountEntity } from '@entities/account.entity';

@Entity({
  name: 'folder'
})
export class FolderEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int8'
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar'
  })
  name: string;

  @ManyToOne(() => AccountEntity, account => account.folders, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: 'accountId'
  })
  account: AccountEntity;

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
