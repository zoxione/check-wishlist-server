import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GiftModel } from './types';
import { GiftService } from './gift.service';
import { v4 as uuid } from 'uuid';

@ApiTags('gifts')
@Controller()
export class GiftController {
  constructor(private readonly appService: GiftService) { }

  @Get('gifts')
  @ApiOperation({ summary: 'Get all gifts' })
  getAllGifts(@Query('userId') userId: typeof uuid): Promise<GiftModel[]> | Promise<GiftModel> | null {
    if (userId) {
      return this.appService.getAllGiftsByUserId(userId);
    }
    else {
      return this.appService.getAllGifts();
    }
  }

  @Get('gifts/:id')
  @ApiOperation({ summary: 'Get gift' })
  getGift(@Param('id') id: typeof uuid): Promise<GiftModel> {
    return this.appService.getGiftById(id);
  }

  @Post('gifts')
  @ApiOperation({ summary: 'Create gift' })
  createGift(@Body() gift: GiftModel): Promise<GiftModel[]> {
    return this.appService.createGift(gift);
  }

  @Put('gifts/:id')
  @ApiOperation({ summary: 'Update gift' })
  updateGift(@Param('id') id: typeof uuid, @Body() gift: GiftModel): Promise<GiftModel> {
    return this.appService.updateGiftById(id, gift);
  }

  @Delete('gifts/:id')
  @ApiOperation({ summary: 'Delete gift' })
  deleteGift(@Param('id') id: typeof uuid): Promise<GiftModel[]> {
    return this.appService.deleteGiftById(id);
  }

  @Delete('gifts')
  @ApiOperation({ summary: 'Delete gifts' })
  deleteGifts(@Query('userId') userId: typeof uuid, @Query('isGifted') isGifted: boolean): Promise<GiftModel[]> {
    if (userId) {
      if (isGifted) {
        return this.appService.deleteGiftedGiftsByUserId(userId);
      }
      else {
        return this.appService.deleteWishlistGiftsByUserId(userId);
      }
    }
    else {
      return this.appService.getAllGifts();
    }
  }
}
