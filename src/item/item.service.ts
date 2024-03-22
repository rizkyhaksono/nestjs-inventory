import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  GetItemRequest,
  PostItemRequest,
  PutItemRequest,
  DeleteItemRequest,
  ItemResponse,
} from 'src/model/item.model';
import { ValidationService } from 'src/common/validation.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { UserValidation } from 'src/user/user.validation';
import { InventoryItem } from '@prisma/client';
import { ItemValidation } from './item.validation';

@Injectable()
export class ItemService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async getItem(token: InventoryItem): Promise<any> {
    this.logger.debug(`Get item ${JSON.stringify(token)}`);
    const items: InventoryItem[] =
      await this.prismaService.inventoryItem.findMany();

    return items;
  }
}
