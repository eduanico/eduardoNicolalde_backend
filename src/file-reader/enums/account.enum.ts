import { ObjectType, registerEnumType } from '@nestjs/graphql';

ObjectType();
export enum AccountEnum {
  INTERNAL = 'INTERNAL',
  PEOPLE = 'PEOPLE',
  OPERATION = 'OPERATION',
}

registerEnumType(AccountEnum, {
  name: 'AccountEnum',
});
