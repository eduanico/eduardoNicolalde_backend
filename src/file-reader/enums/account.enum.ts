import { ObjectType, registerEnumType } from '@nestjs/graphql';

ObjectType();
export enum AccountEnum {
  INTERNAL,
  PEOPLE,
  OPERATION,
}

registerEnumType(AccountEnum, {
  name: 'AccountEnum',
});
