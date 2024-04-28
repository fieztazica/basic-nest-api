import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { ApiProperty } from '@nestjs/swagger';

export class ProductEntity implements Partial<Product> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: Decimal;

  @ApiProperty()
  createdUserId: number;
}
