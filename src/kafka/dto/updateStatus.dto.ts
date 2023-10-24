import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { StatusEnum } from 'src/ticket/enums/status.enum';

@InputType()
export class UpdateStatusDTO {
  @Field(() => String)
  @IsNotEmpty()
  @IsString({
    message: 'El id debe ser un string válido',
  })
  id: string;

  @Field(() => StatusEnum)
  @IsNotEmpty()
  @IsNumber()
  status: number;
}
