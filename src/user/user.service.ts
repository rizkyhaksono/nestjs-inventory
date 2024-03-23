import {
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10)

    createUserDto.password = hashPassword

    return this.prisma.user.create({
      data: createUserDto
    })
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(uuid: string) {
    return this.prisma.user.findUnique({
      where: {
        uuid: uuid
      }
    })
  }

  async update(uuid: string, updateUserDto: any) {
    return this.prisma.user.update({
      where: {
        uuid: uuid
      },
      data: updateUserDto
    })
  }

  async remove(uuid: string) {
    return this.prisma.user.delete({
      where: {
        uuid: uuid
      }
    })
  }
}
