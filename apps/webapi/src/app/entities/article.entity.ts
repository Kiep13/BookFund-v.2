import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { FolderEntity } from '@entities/folder.entity';

@Entity({
  name: 'article'
})
export class ArticleEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int8'
  })
  id: number;

  @Column({
    name: 'title',
    type: 'varchar'
  })
  title: string;

  @Column({
    name: 'contentFileUrl',
    type: 'varchar'
  })
  contentFileUrl: string;

  @Column({
    name: 'isRedirecting',
    type: 'bool'
  })
  isRedirecting: boolean;

  @Column({
    name: 'exactUrl',
    type: 'varchar'
  })
  exactUrl: string;

  @Column({
    name: 'hostUrl',
    type: 'varchar'
  })
  hostUrl: string;

  @ManyToOne(() => FolderEntity, folder => folder.articles, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: 'folderId'
  })
  folder: FolderEntity;

  @Column({
    select: false,
    nullable: true,
    insert: false,
    update: false
  })
  public content: string;

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
