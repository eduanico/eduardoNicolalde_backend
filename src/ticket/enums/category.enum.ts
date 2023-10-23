import { ObjectType, registerEnumType } from '@nestjs/graphql';

ObjectType();
export enum CategoryEnum {
  INCIDENT = 'indicent',
  SUPPORT = 'support',
  ERROR = 'error',
}

registerEnumType(CategoryEnum, {
  name: 'CategoryEnum',
});
