import { ObjectType, registerEnumType } from '@nestjs/graphql';

ObjectType();
export enum FileStatusEnum {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
}

registerEnumType(FileStatusEnum, {
  name: 'FileStatusEnum',
});
