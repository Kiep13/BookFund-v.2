import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BookStatuses } from '@core/enums';
import { AccountEntity } from '@entities/account.entity';
import { BookEntity } from '@entities/book.entity';

@Entity({
  name: 'favorites'
})
export class FavoriteEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int8'
  })
  id: number;

  @ManyToOne(() => BookEntity, book => book.favorites, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: 'bookId'
  })
  book: BookEntity;

  @ManyToOne(() => AccountEntity, account => account.favorites, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: 'accountId'
  })
  account: AccountEntity;

  @Column({
    name: 'bookmarkPage',
    type: 'int',
    default: 0,
    nullable: true
  })
  bookmarkPage: number;

  @Column({
    name: 'status',
    type: 'enum',
    enumName: 'statusesEnum',
    enum: BookStatuses,
    default: BookStatuses.WANT_TO_READ
  })
  status: BookStatuses;

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
