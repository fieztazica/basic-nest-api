// TODO: generate register dto based on user created dto
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class RegisterDto extends CreateUserDto {
  confirmPassword: string;
}
