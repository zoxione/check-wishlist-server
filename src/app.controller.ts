import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { GiftService } from './gift.service';
import { Gift as GiftModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly giftService: GiftService,
  ) { }

  @Post('user')
  async createUser(
    @Body() userData: { name: string; email: string, password: string, imageUrl: string, coverUrl: string, address: string, tiktokName: string, twitterName: string, vkName: string, tgName: string, instagramName: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: { name: string; email: string, password: string, imageUrl: string, coverUrl: string, address: string, tiktokName: string, twitterName: string, vkName: string, tgName: string, instagramName: string },
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: id },
      data: userData,
    });
  }

  @Delete('user/:id')
  async deleteUser(
    @Param('id') id: string
  ): Promise<UserModel> {
    return this.userService.deleteUser({ id: id });
  }


  @Post('gift')
  async createGift(
    @Body() giftData: { title: string; description: string, shopName: string, shopUrl: string, price: number, imageUrl: string, userId: string },
  ): Promise<GiftModel> {
    return this.giftService.createGift(giftData);
  }

  @Put('gift/:id')
  async updateGift(
    @Param('id') id: string,
    @Body() giftData: { title: string; description: string, shopName: string, shopUrl: string, price: number, imageUrl: string, userId: string },
  ): Promise<GiftModel> {
    return this.giftService.updateGift({
      where: { id: id },
      data: giftData,
    });
  }

  @Delete('gift/:id')
  async deleteGift(
    @Param('id') id: string
  ): Promise<GiftModel> {
    return this.giftService.deleteGift({ id: id });
  }
}