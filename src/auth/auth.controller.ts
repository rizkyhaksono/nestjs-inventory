import { Controller, Body, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { AuthEntity } from "./entity/auth.entity";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() { email, password }: LoginDto) {
    return await this.authService.login(email, password)
  }
}