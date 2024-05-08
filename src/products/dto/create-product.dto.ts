import { Prisma } from '@prisma/client';
import { DecimalJsLike } from '@prisma/client/runtime/library';

export class CreateProductDto implements Prisma.ProductCreateInput {
  uuid?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  name: string;
  description?: string;
  price: string | number | Prisma.Decimal | DecimalJsLike;
  categories?: Prisma.ProductToCategoryCreateNestedManyWithoutProductInput;
  createdBy?: Prisma.UserCreateNestedOneWithoutProductsInput;
}
