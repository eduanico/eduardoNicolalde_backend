import { ObjectType, registerEnumType } from "@nestjs/graphql";

ObjectType()
export enum PriorityEnum {
  high,
  medium,
  low,
}

registerEnumType(PriorityEnum, {
    name: 'PriorityEnum',
  });