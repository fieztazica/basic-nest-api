import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';

export class UserEntity implements Partial<User> {
  @ApiProperty()
  email: string;

  @ApiProperty({})
  password: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  gender: $Enums.EnumGender;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty({ default: [$Enums.EnumRole.USER], isArray: true })
  roles: $Enums.EnumRole[];

  @ApiProperty({ required: false, nullable: true })
  createdAt: Date;

  @ApiProperty({ required: false, nullable: true })
  updatedAt: Date;
}
