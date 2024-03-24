import { ApiProperty } from '@nestjs/swagger';
import { InventoryItem } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ItemEntity implements InventoryItem {
  constructor(partial: Partial<ItemEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  userId: string;
}
