import { IsIn, ValidationOptions } from 'class-validator';

import { ERole } from '../enum/role.enum';

export function IsAllowedRole(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) =>
    IsIn([ERole.BUYER, ERole.SELLER, ERole.DEALER], validationOptions)(
      object,
      propertyName,
    );
}
