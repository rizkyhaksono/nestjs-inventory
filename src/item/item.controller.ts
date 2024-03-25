import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  UseGuards,
  Body,
} from '@nestjs/common';
import { ItemService } from './item.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ItemEntity } from './entity/item.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { UserEntity } from 'src/user/entity/user.entity';

@Controller('api/item')
@ApiTags('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiCreatedResponse({ type: ItemEntity })
  async createItem(@Body() createItem: CreateItemDto) {
    return await this.itemService.create(createItem);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ItemEntity, isArray: true })
  async findAll() {
    const items = await this.itemService.findAll();
    return items.map((item) => new ItemEntity(item));
  }

  @Get(':uuid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ItemEntity })
  async findByUser(@Param('uuid') uuid: string) {
    return await this.itemService.findByUser(uuid);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  async updateItem(
    @Param(':id') id: number,
    @Body() updateItem: UpdateItemDto,
  ) {
    return await this.updateItem(id, updateItem);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id') id: number) {
    return await this.itemService.remove(id);
  }
}
