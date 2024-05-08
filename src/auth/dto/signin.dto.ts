import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  rememberMe?: boolean;
}
