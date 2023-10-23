import { ObjectType, registerEnumType } from '@nestjs/graphql';

ObjectType();
export enum FileStatusEnum {
  PENDING,
  PROCESS,
}

registerEnumType(FileStatusEnum, {
  name: 'FileStatusEnum',
});
