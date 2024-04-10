import { PrismaService } from '../src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteAll() {
    await this.deleteUser();
    await this.deleteInventoryItem();
  }

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'test user',
      },
    });
  }

  async deleteInventoryItem() {
    await this.prismaService.inventoryItem.deleteMany({
      where: {
        name: 'test item',
      },
    });
  }

  async createUser() {
    await this.prismaService.user.create({
      data: {
        email: 'test@gmail.com',
        username: 'test user',
        password: await bcrypt.hash('test123', 10),
      },
    });
  }

  async getUser() {
    return await this.prismaService.user.findMany({
      where: {
        username: 'test user',
      },
    });
  }

  async createInventoryItem() {
    const user = await this.getUser();
    await this.prismaService.inventoryItem.create({
      data: {
        name: 'test item',
        quantity: '1',
        userId: user[0].uuid,
      },
    });
  }

  async getInventoryItem() {
    return await this.prismaService.inventoryItem.findMany({
      where: {
        name: 'test item',
      },
    });
  }
}
