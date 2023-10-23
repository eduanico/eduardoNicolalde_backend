import { ObjectType, registerEnumType } from '@nestjs/graphql';

ObjectType();
export enum StatusEnum {
  PENDING = 'pending',
  VERIFIED = 'verified',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

registerEnumType(StatusEnum, {
  name: 'StatusEnum',
});
