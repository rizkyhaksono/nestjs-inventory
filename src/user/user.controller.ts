import { Controller, Get, Body, Post, Patch, Param, Delete, ParseIntPipe, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "./entity/user.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.userService.create(createUserDto))
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: UserEntity, isArray: true})
  async findAll() {
    const users = await this.userService.findAll()
    return users.map((user) => new UserEntity(user))
  }

  @Get(':uuid')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: UserEntity })
  async findOne(@Param('uuid') uuid: string) {
    return new UserEntity(await this.userService.findOne(uuid))
  }

  @Patch(':uuid')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: UserEntity })
  async update(@Param('uuid') uuid: string, @Body() updateUserDto: any) {
    return new UserEntity(await this.userService.update(uuid, updateUserDto))
  }

  @Delete(':uuid')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: UserEntity })
  async remove(@Param('uuid') uuid: string) {
    return new UserEntity(await this.userService.remove(uuid))
  }
}