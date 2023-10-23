import {
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { AccountEnum } from './enums/account.enum';
import { FileStatusEnum } from './enums/fileStatus.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('data')
export class Data {
  @IsNumber()
  @IsNotEmpty()
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @IsNumber()
  @Column({ type: 'float' })
  @IsNotEmpty()
  balance: number;

  @IsEnum(AccountEnum)
  @Column({
    type: 'enum',
    enum: AccountEnum,
  })
  @IsNotEmpty()
  account: AccountEnum;

  @IsString()
  @Column()
  @IsNotEmpty()
  @MaxLength(500, {
    message: 'Descripción excede el límite aceptado de 500',
  })
  description: string;

  @IsEnum(FileStatusEnum)
  @Column({
    type: 'enum',
    enum: FileStatusEnum,
  })
  @IsNotEmpty()
  status: FileStatusEnum;

  @IsDate()
  @Column()
  @IsNotEmpty()
  date: Date;
}
