import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

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
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

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
