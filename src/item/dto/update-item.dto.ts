import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  quantity: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}
