import { ApiProperty } from '@nestjs/swagger';
import { InventoryItem } from '@prisma/client';

export class ItemEntity implements InventoryItem {
  constructor(partial: Partial<ItemEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: string;
}
