import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignInDto } from './dto/signin.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import {
  ApiOkResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TokenResponseDto } from './dto/token-response.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOkResponse({
    description: 'Sign in successfully',
    type: TokenResponseDto,
  })
  @ApiBody({ type: SignInDto })
  async signIn(
    @Body()
    signInData: SignInDto,
  ): Promise<TokenResponseDto> {
    if (!signInData.username || !signInData.password) {
      throw new UnauthorizedException('Invalid sign in data');
    }

    const user = await this.authService.validateUser(
      signInData.username,
      signInData.password,
    );

    if (!user) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    return this.authService.signIn(
      user,
      signInData.rememberMe ? 60 * 60 * 24 : undefined,
    );
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  @ApiCreatedResponse({
    description: 'Refresh token successfully',
    type: TokenResponseDto,
  })
  @ApiBody({ type: RefreshTokenDto })
  async refreshToken(@Body() data: RefreshTokenDto): Promise<TokenResponseDto> {
    return this.authService.refreshToken(data);
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'Sign up successfully',
    type: TokenResponseDto,
  })
  @ApiBody({ type: SignInDto })
  async register(@Body() registerData: RegisterDto) {
    return this.authService.register(registerData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req) {
    return req.user;
  }
}
