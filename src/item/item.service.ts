import * as path from 'path';
import * as fs from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto, file: Express.Multer.File) {
    const item = {
      ...createItemDto,
      imageUrl: file.path,
    };

    return this.prisma.inventoryItem.create({
      data: item,
    });
  }

  async serveImage(imgpath: string) {
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

    return imagePath;
  }

  async findAll() {
    const items = await this.prisma.inventoryItem.findMany();
    return items.map((item) => {
      if (item.imageUrl) {
        const imageName = item.imageUrl.split('\\').pop();
        item.imageUrl = `${process.env.BASE_URL}/api/item/image/${imageName}`;
      }
      return item;
    });
  }

  async findByUser(uuid: string) {
    const items = await this.prisma.inventoryItem.findMany({
      where: { userId: uuid },
    });
    return items.map((item) => {
      if (item.imageUrl) {
        const imageName = item.imageUrl.split('\\').pop();
        item.imageUrl = `${process.env.BASE_URL}/api/item/image/${imageName}`;
      }
      return item;
    });
  }

  async update(itemId: number, updateItemDto: UpdateItemDto) {
    if (updateItemDto.imageUrl) {
      const imageName = updateItemDto.imageUrl.split('\\').pop();
      updateItemDto.imageUrl = `${process.env.BASE_URL}/api/item/image/${imageName}}`;
    }

    return this.prisma.inventoryItem.update({
      where: {
        id: itemId,
      },
      data: updateItemDto,
    });
  }

  async remove(itemId: number) {
    return this.prisma.inventoryItem.delete({
      where: {
        id: itemId,
      },
    });
  }
}
