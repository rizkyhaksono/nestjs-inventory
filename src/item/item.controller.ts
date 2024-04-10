import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  UseGuards,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { ItemService } from './item.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
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
  @UseInterceptors(
    FileInterceptor('imageUrl', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!/\.(jpg|jpeg|png)$/.exec(file.originalname)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  @ApiCreatedResponse({ type: ItemEntity })
  async createItem(
    @UploadedFile() file: Express.Multer.File,
    @Body() createItem: CreateItemDto,
  ) {
    return await this.itemService.create({
      ...createItem,
      imageUrl: file.path,
    });
  }

  @ApiBearerAuth()
  @Get('image/:imgpath')
  async serveImage(@Param('imgpath') imgpath: string, @Res() res: Response) {
    imgpath = imgpath.replace(/\\/g, '/');
    const imagePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'uploads',
      imgpath,
    );

    if (!fs.existsSync(imagePath)) {
      throw new NotFoundException(`The file ${imgpath} does not exist.`);
    }

    res.sendFile(imagePath);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ItemEntity, isArray: true })
  async findAll() {
    const items = await this.itemService.findAll();
    return items.map((item) => {
      const itemEntity = new ItemEntity(item);
      if (itemEntity.imageUrl) {
        const imageName = itemEntity.imageUrl.split('\\').pop();
        itemEntity.imageUrl = `${process.env.BASE_URL}/api/item/image/${imageName}`;
      }
      return itemEntity;
    });
  }

  @Get(':uuid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ItemEntity })
  async findByUser(@Param('uuid') uuid: string) {
    const item = await this.itemService.findByUser(uuid);
    return item.map((v) => {
      const itemEntity = new ItemEntity(v);
      if (itemEntity.imageUrl) {
        const imageName = itemEntity.imageUrl.split('\\').pop();
        itemEntity.imageUrl = `${process.env.BASE_URL}/api/item/image/${imageName}`;
      }
      return itemEntity;
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  async updateItem(
    @Param(':id') id: number,
    @Body() updateItem: UpdateItemDto,
  ) {
    return await this.itemService.update(id, updateItem);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id') id: number) {
    return await this.itemService.remove(id);
  }
}
