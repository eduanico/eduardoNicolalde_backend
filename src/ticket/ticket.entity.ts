import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => String)
  priority: PriorityEnum;

  @Column()
  @Field(() => String)
  category: CategoryEnum;

  @Column()
  @Field(() => String)
  status: StatusEnum;
}

enum StatusEnum {
  "pending",
  "verified",
  "approved",
  "rejected",
}

enum PriorityEnum {
  "high",
  "medium",
  "low",
}

enum CategoryEnum {
  "incident",
  "support",
  "error",
}
