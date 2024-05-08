import { Prisma } from '@prisma/client';

export class CreateCategoryDto implements Prisma.CategoryCreateInput {
  createdAt?: string | Date;
  updatedAt?: string | Date;
  name: string;
  description?: string;
  uuid?: string;
  products?: Prisma.ProductToCategoryCreateNestedManyWithoutCategoryInput;
}
