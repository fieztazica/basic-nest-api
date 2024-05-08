import { $Enums, Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty()
  username: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  firstName?: string;

  @ApiProperty({ required: false })
  lastName?: string;

  @ApiProperty({ required: false })
  gender?: $Enums.EnumGender;

  @ApiProperty({ required: false })
  phoneNumber?: string;

  @ApiProperty({ required: false })
  createdAt?: string | Date;

  @ApiProperty({ required: false })
  updatedAt?: string | Date;

  @ApiProperty({ required: false })
  uuid?: string;

  @ApiProperty({ required: false })
  fullName?: string;

  @ApiProperty({ required: false })
  role?: $Enums.EnumRole;

  @ApiProperty({ required: false })
  products?: Prisma.ProductCreateNestedManyWithoutCreatedByInput;
}
