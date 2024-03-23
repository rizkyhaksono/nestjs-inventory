import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }

  @ApiProperty()
  uuid: string

  @ApiProperty()
  username: string

  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  password: string

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}