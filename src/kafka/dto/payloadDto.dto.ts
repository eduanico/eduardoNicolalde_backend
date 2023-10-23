import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { UpdateDTO } from './updateDto.dto';

@InputType()
export class PayloadDTO {
  @Field(() => UpdateDTO)
  @IsNotEmpty()
  updateDto: UpdateDTO;
}
