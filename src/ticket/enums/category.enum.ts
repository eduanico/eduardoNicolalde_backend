import { ObjectType, registerEnumType } from '@nestjs/graphql';

ObjectType();
export enum CategoryEnum {
  "incident",
  "support",
  "error",
}

registerEnumType(CategoryEnum, {
  name: 'CategoryEnum',
});
