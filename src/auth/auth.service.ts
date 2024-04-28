import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService, type JwtSignOptions } from '@nestjs/jwt';
import { verify as argon2Verify, hash as argon2Hash } from 'argon2';
import { UserEntity as User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';
import { RegisterDto } from './dto/register.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

type DefaultPayload = {
  username: string;
  sub: string | number;
};

const defaultRefreshTokenOption: JwtSignOptions = {
  expiresIn: 60 * 60 * 24 * 30,
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto): Promise<TokenResponseDto> {
    // TODO: hash password
    if (data.password !== data.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    data.password = await argon2Hash(data.password);
    const user = await this.usersService.create(data);
    return this.signIn(user);
  }

  async signIn(
    user: Omit<User, 'password'>,
    expiresIn?: number,
  ): Promise<TokenResponseDto> {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };
    const options: JwtSignOptions = {
      // 1 hour by default
      expiresIn: expiresIn || 60 * 60,
    };
    return {
      access_token: this.jwtService.sign(payload, options),
      refresh_token: this.jwtService.sign(payload, defaultRefreshTokenOption),
      expires_in: options.expiresIn,
    };
  }

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOneByEmailOrUsername(username);

    if (user && (await argon2Verify(user.password, pass))) {
      return user satisfies Omit<User, 'password'>;
    }

    return null;
  }

  // auth.service.ts

  /**
   * Refreshes the access token using a refresh token.
   *
   * @param {RefreshTokenDto} refresh_token - The refresh token to be used.
   * @return {Promise<TokenResponseDto>} The new access token, refresh token, and expiration time.
   */
  async refreshToken({
    refresh_token,
  }: RefreshTokenDto): Promise<TokenResponseDto> {
    const old_payload = this.jwtService.verify(refresh_token, {
      secret: jwtConstants.secret,
    });

    // Check if the refresh token is valid
    if (!old_payload) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersService.findOneByUuid(old_payload.sub);

    // Check if the user still exists
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload: DefaultPayload = {
      username: user.username,
      sub: user.id,
    };
    // Generate a new access token
    const new_access_token = this.jwtService.sign(payload);
    const expires_in = 60 * 60; // 1 hour in seconds

    return { access_token: new_access_token, refresh_token, expires_in };
  }
}
