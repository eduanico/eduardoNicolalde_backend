import { IsDate, IsEnum, IsNumber, IsString, MaxLength } from 'class-validator';
import { AccountEnum } from './enums/account.enum';
import { FileStatusEnum } from './enums/fileStatus.enum';

export class Data {
  @IsNumber()
  id: number;

  @IsNumber()
  balance: number;

  @IsEnum(AccountEnum)
  account: AccountEnum;

  @IsString()
  @MaxLength(500, {
    message: 'Descripción excede el límite aceptado de 500',
  })
  description: string;

  @IsEnum(FileStatusEnum)
  status: FileStatusEnum;

  @IsDate()
  date: Date;
}
