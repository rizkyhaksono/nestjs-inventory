import { Body, Controller, Delete, Get, HttpCode, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { WebResponse } from "src/model/web.model";
import { LoginUserRequest, RegisterUserRequest, UpdateUserRequest, UserResponse } from "src/model/user.model";
import { Auth } from "src/common/auth.decorator";
import { User } from "@prisma/client";

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('/register')
  @HttpCode(201)
  async register(@Body() request: RegisterUserRequest): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.register(request);
    return {
      success: true,
      data: result,
    };
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() request: LoginUserRequest): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.login(request);
    return {
      success: true,
      data: result,
    };
  }

  @Get()
  @HttpCode(200)
  async get(@Auth() user: User): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.get(user)
    return {
      success: true,
      data: result
    }
  }

  @Patch()
  @HttpCode(201)
  async update(@Auth() user: User, @Body() request: UpdateUserRequest): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.update(user, request);
    return {
      success: true,
      data: result
    }
  }

  @Delete()
  @HttpCode(201)
  async logout(@Auth() user: User): Promise<WebResponse<boolean>> {
    await this.userService.logout(user)
    return {
      success: true,
    }
  }
}