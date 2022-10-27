import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Gift, Prisma } from '@prisma/client';

@Injectable()
export class GiftService {
  constructor(private prisma: PrismaService) { }

  async showGifts(
  ): Promise<Gift[] | null> {
    return this.prisma.gift.findMany({});
  }

  async showGift(
    where: Prisma.GiftWhereUniqueInput
  ): Promise<Gift | null> {
    return this.prisma.gift.findUnique({
      where,
    });
  }

  async createGift(
    data: Prisma.GiftCreateInput
  ): Promise<Gift> {
    return this.prisma.gift.create({
      data,
    });
  }

  async updateGift(params: {
    where: Prisma.GiftWhereUniqueInput;
    data: Prisma.GiftUpdateInput;
  }): Promise<Gift> {
    const { where, data } = params;
    return this.prisma.gift.update({
      where,
      data,
    });
  }

  async deleteGift(
    where: Prisma.GiftWhereUniqueInput
  ): Promise<Gift> {
    return this.prisma.gift.delete({
      where,
    });
  }

  async deleteGifts(params: {
    data: Prisma.GiftUpdateInput
  }): Promise<{}> {
    const { data } = params;
    return this.prisma.gift.deleteMany({
      where: { userId: data.userId.toString() },
    })
  }
}