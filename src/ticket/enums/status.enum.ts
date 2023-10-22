import { ObjectType, registerEnumType } from '@nestjs/graphql';

ObjectType();
export enum StatusEnum {
  pending,
  verified,
  approved,
  rejected,
}

registerEnumType(StatusEnum, {
  name: 'StatusEnum',
});
