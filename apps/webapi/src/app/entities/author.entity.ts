import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'author'
})
export class Author {
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
    name: 'biography',
    type: 'text'
  })
  biography: string;

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

