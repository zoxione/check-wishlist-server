import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Gift, Prisma } from '@prisma/client';

@Injectable()
export class GiftService {
  constructor(private prisma: PrismaService) { }

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
      data,
      where,
    });
  }

  async deleteGift(where: Prisma.GiftWhereUniqueInput): Promise<Gift> {
    return this.prisma.gift.delete({
      where,
    });
  }
}