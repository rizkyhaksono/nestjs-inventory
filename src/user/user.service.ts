import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(uuid: string) {
    return await this.prisma.user.findUnique({
      where: {
        uuid: uuid,
      },
    });
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        uuid: uuid,
      },
      data: updateUserDto,
    });
  }

  async remove(uuid: string) {
    return await this.prisma.user.delete({
      where: {
        uuid: uuid,
      },
    });
  }
}
