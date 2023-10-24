import { Field, InputType, Int } from '@nestjs/graphql';
import { CategoryEnum } from '../enums/category.enum';
import { PriorityEnum } from '../enums/priority.enum';
import { StatusEnum } from '../enums/status.enum';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

@InputType()
export class TicketFilterDTO {

  @Field(()=> Date, {nullable:true})
  @IsDate()
  @IsOptional()
  start: Date;

  @Field(()=> Date, {nullable:true})
  @IsDate()
  @IsOptional()
  end: Date;

  @Field(() => PriorityEnum, {nullable:true})
  @IsEnum(PriorityEnum)
  @IsOptional()
  priority: PriorityEnum;

  @Field(() => CategoryEnum, {nullable:true})
  @IsEnum(CategoryEnum)
  @IsOptional()
  category: CategoryEnum;

  @Field(() => StatusEnum, {nullable:true})
  @IsEnum(StatusEnum)
  @IsOptional()
  status: StatusEnum;

  @Field(()=> Int, {nullable:true})
  @IsOptional()
  skip: number = 0;

  @Field(()=> Int, {nullable:true})
  @IsOptional()
  limit: number = 10;
}
