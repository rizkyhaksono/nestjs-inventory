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
  NotAcceptableException,
  Res,
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
          return cb(
            new NotAcceptableException('Only image files are allowed!'),
            false,
          );
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
    return await this.itemService.create(createItem, file);
  }

  @ApiBearerAuth()
  @Get('image/:imgpath')
  async serveImage(@Param('imgpath') imgpath: string, @Res() res: Response) {
    const imagePath = await this.itemService.serveImage(imgpath);
    res.sendFile(imagePath);
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
    const items = await this.itemService.findByUser(uuid);
    return items.map((item) => new ItemEntity(item));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
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
          return cb(
            new NotAcceptableException('Only image files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async updateItem(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateItem: UpdateItemDto,
  ) {
    return await this.itemService.update(id, updateItem, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id') id: number) {
    return await this.itemService.remove(id);
  }
}
