import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Transaction, Prisma } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) { }

  async showTransactions(
  ): Promise<Transaction[] | null> {
    return this.prisma.transaction.findMany({});
  }

  async showTransaction(
    where: Prisma.TransactionWhereUniqueInput
  ): Promise<Transaction | null> {
    return this.prisma.transaction.findUnique({
      where,
    });
  }

  async createTransaction(
    data: Prisma.TransactionCreateInput
  ): Promise<Transaction> {
    return this.prisma.transaction.create({
      data,
    });
  }

  async updateTransaction(params: {
    where: Prisma.TransactionWhereUniqueInput;
    data: Prisma.TransactionUpdateInput;
  }): Promise<Transaction> {
    const { where, data } = params;
    return this.prisma.transaction.update({
      data,
      where,
    });
  }

  async deleteTransaction(
    where: Prisma.TransactionWhereUniqueInput
  ): Promise<Transaction> {
    return this.prisma.transaction.delete({
      where,
    });
  }
}