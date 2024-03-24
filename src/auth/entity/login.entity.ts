import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class LoginEntity {
  @ApiProperty()
  accessToken: string;
}
