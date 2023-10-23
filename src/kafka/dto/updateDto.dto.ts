import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatusEnum } from 'src/ticket/enums/status.enum';

@InputType()
export class UpdateDTO {
  @Field(() => String)
  @IsNotEmpty()
  @IsString({
    message: 'El id debe ser un string válido',
  })
  id: string;

  @Field(() => StatusEnum)
  @IsNotEmpty()
  @IsEnum(StatusEnum, {
    message:
      'El estado solo puede ser : pending | verified | approved | rejected',
  })
  status: StatusEnum;
}
