import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StatusDTO {
  @PrimaryGeneratedColumn()
  id: number;
  status: number;
}
