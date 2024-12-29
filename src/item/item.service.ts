import * as path from 'path';
import { join } from 'path';
import * as fs from 'fs';
import { unlink } from 'fs/promises';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) { }

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

  async update(
    itemId: number,
    updateItemDto: UpdateItemDto,
    file: Express.Multer.File,
  ) {
    const item = await this.prisma.inventoryItem.findUnique({
      where: { id: Number(itemId) },
    });

    if (!item) {
      throw new NotFoundException(`Item with ID ${itemId} not found`);
    }

    if (!itemId) {
      throw new NotFoundException('itemId is required');
    }

    if (item.imageUrl) {
      const previousImagePath = join(
        process.cwd(),
        item.imageUrl.split('/').pop(),
      );
      try {
        await unlink(previousImagePath);
      } catch (err) {
        console.error(`Failed to delete the previous image: ${err}`);
      }
    }

    const itemUpdate = {
      ...updateItemDto,
      imageUrl: file.path,
    };

    return this.prisma.inventoryItem.update({
      where: {
        id: Number(itemId),
      },
      data: itemUpdate,
    });
  }

  async remove(itemId: number) {
    const item = await this.prisma.inventoryItem.findUnique({
      where: { id: Number(itemId) },
    });

    if (!item) {
      throw new NotFoundException(`Item with ID ${itemId} not found`);
    }

    const filePath = item.imageUrl;

    try {
      await unlink(filePath);
    } catch (err) {
      console.error(`Error deleting file: ${err}`);
    }

    return this.prisma.inventoryItem.delete({
      where: {
        id: Number(itemId),
      },
    });
  }
}
