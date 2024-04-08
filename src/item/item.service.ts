import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto) {
    return this.prisma.inventoryItem.create({
      data: createItemDto,
    });
  }

  async findAll() {
    return this.prisma.inventoryItem.findMany();
  }

  async findByUser(uuid: string) {
    return this.prisma.inventoryItem.findMany({
      where: {
        userId: uuid,
      },
    });
  }

  async update(itemId: number, updateItemDto: UpdateItemDto) {
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
