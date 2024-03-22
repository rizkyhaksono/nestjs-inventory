import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { WebResponse } from 'src/model/web.model';
import {
  GetItemRequest,
  PostItemRequest,
  PutItemRequest,
  DeleteItemRequest,
  ItemResponse,
} from 'src/model/item.model';
import { Auth } from 'src/common/auth.decorator';
import { InventoryItem } from '@prisma/client';

@Controller('/api/item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get('/:userId')
  @HttpCode(200)
  async get(@Auth() item: InventoryItem): Promise<WebResponse<ItemResponse>> {
    const result = await this.itemService.getItem(item);
    return {
      success: true,
      data: result,
    };
  }
}
