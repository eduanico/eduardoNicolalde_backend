import { ObjectType, registerEnumType } from '@nestjs/graphql';

ObjectType();
export enum PriorityEnum {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

registerEnumType(PriorityEnum, {
  name: 'PriorityEnum',
});
