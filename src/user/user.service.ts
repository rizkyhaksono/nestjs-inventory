import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(uuid: string) {
    return this.prisma.user.findUnique({
      where: {
        uuid: uuid,
      },
    });
  }

  async update(uuid: string, updateUserDto: any) {
    return this.prisma.user.update({
      where: {
        uuid: uuid,
      },
      data: updateUserDto,
    });
  }

  async remove(uuid: string) {
    return this.prisma.user.delete({
      where: {
        uuid: uuid,
      },
    });
  }
}
