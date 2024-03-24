import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class RegisterEntity {
  constructor(partial: Partial<RegisterEntity>) {
    Object.assign(this, partial)
  }

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  username: string

  @ApiProperty()
  email: string;

  @Exclude()
  password: string

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}