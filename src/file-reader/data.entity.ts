import {
  IsDate,
  IsNumber,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
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

  @Column()
  @IsNotEmpty()
  @IsString()
  account: string;

  @IsString()
  @Column()
  @IsNotEmpty()
  @MaxLength(500, {
    message: 'Descripción excede el límite aceptado de 500',
  })
  description: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  status: string;

  @IsDate()
  @Column()
  @IsNotEmpty()
  date: Date;
}
