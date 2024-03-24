import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginEntity } from './entity/login.entity';
import { RegisterEntity } from './entity/register.entity';
import { RegisterDto } from './dto/register.dto';

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: LoginEntity })
  async login(@Body() { email, password }: LoginDto) {
    return await this.authService.login(email, password);
  }

  @Post('register')
  @ApiCreatedResponse({ type: RegisterEntity })
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }
}
