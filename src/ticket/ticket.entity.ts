import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from './enums/status.enum';
import { CategoryEnum } from './enums/category.enum';
import { PriorityEnum } from './enums/priority.enum';

@ObjectType('Ticket')
@Entity()
export class Ticket {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => PriorityEnum)
  priority: PriorityEnum;

  @Column()
  @Field(() => CategoryEnum)
  category: CategoryEnum;

  @Column()
  @Field(() => StatusEnum)
  status: StatusEnum;
}
