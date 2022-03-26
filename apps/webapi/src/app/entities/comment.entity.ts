import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AccountEntity } from '@entities/account.entity';
import { BookEntity } from '@entities/book.entity';

@Entity({
  name: 'comment'
})
export class CommentEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int8'
  })
  id: number;

  @ManyToOne(() => BookEntity, book => book.comments, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: 'bookId'
  })
  book: BookEntity;

  @ManyToOne(() => AccountEntity, account => account.comments, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: 'accountId'
  })
  account: AccountEntity;

  @Column({
    name: 'rate',
    type: 'float',
    default: 0.0,
    nullable: true
  })
  rate: number;

  @Column({
    name: 'text',
    type: 'text'
  })
  text: string;

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
