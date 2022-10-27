import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { GiftService } from './gift.service';
import { Gift as GiftModel } from '@prisma/client';
import { TransactionService } from './transaction.service';
import { Transaction as TransactionModel } from '@prisma/client';

@Controller()
export class GiftController {
  constructor(private readonly giftService: GiftService, private readonly transactionService: TransactionService) { }

  @Get('gift')
  async showGifts(
  ): Promise<GiftModel[]> {
    return this.giftService.showGifts();
  }

  @Get('gift/:id')
  async showGift(
    @Param('id') id: string,
  ): Promise<GiftModel> {
    return this.giftService.showGift(
      { id: id }
    );
  }

  @Post('gift')
  async createGift(
    @Body() giftData: { title: string; description: string, shopName: string, shopUrl: string, price: number, imageUrl: string, isGifted: boolean, userId: string },
  ): Promise<GiftModel> {
    return this.giftService.createGift(giftData);
  }

  @Put('gift/:id')
  async updateGift(
    @Param('id') id: string,
    @Body() giftData: { title: string; description: string, shopName: string, shopUrl: string, price: number, imageUrl: string, isGifted: boolean, userId: string },
  ): Promise<GiftModel> {
    return this.giftService.updateGift({ where: { id: id }, data: giftData });
  }

  @Put('gift_give')
  async giveGift(
    @Body() data: { giftId: string, gifterId: string },
  ): Promise<GiftModel> {
    this.transactionService.createTransaction({
      giftId: data.giftId,
      gifterId: data.gifterId,
      isCompleted: false
    });
    return this.giftService.updateGift({
      where: { id: data.giftId },
      data: { isGifted: true },
    });
  }

  @Delete('gift/:id')
  async deleteGift(
    @Param('id') id: string
  ): Promise<GiftModel> {
    return this.giftService.deleteGift({ id: id });
  }

  @Delete('gift')
  async deleteGifts(
    @Body() giftData: { title: string; description: string, shopName: string, shopUrl: string, price: number, imageUrl: string, userId: string },
  ): Promise<{}> {
    return this.giftService.deleteGifts({ data: giftData });
  }
}