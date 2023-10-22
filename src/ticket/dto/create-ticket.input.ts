import { Field, InputType } from '@nestjs/graphql';
import { CategoryEnum } from '../enums/category.enum';
import { PriorityEnum } from '../enums/priority.enum';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateTicketInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(50, {
    message: 'Título excede el límite aceptado de 50',
  })
  title: string;

  @Field({ nullable: true })
  @MaxLength(150, {
    message: 'Descripción excede el límite aceptado de 150',s
  })
  description?: string;

  @Field(() => PriorityEnum)
  priority: PriorityEnum;

  @Field(() => CategoryEnum)
  category: CategoryEnum;

  // @Field(() => StatusEnum)
  // status: StatusEnum;
}
