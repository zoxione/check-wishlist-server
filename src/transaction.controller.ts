import { Controller, Get, Param, Post, Body, Put, Delete, Patch } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction as TransactionModel } from '@prisma/client';

@Controller()
export class TransactionController {
  constructor(private readonly TransactionService: TransactionService) { }

  @Get('transaction')
  async showTransactions(
  ): Promise<TransactionModel[]> {
    return this.TransactionService.showTransactions();
  }

  @Get('transaction/:id')
  async showTransaction(
    @Param('id') id: string,
  ): Promise<TransactionModel> {
    return this.TransactionService.showTransaction(
      { id: id }
    );
  }

  @Post('transaction')
  async createTransaction(
    @Body() TransactionData: { giftId: string, userId: string, gifterId: string, isCompleted: boolean },
  ): Promise<TransactionModel> {
    return this.TransactionService.createTransaction(TransactionData);
  }

  @Patch('transaction/:id')
  async changeTransaction(
    @Param('id') id: string,
    @Body() TransactionData: { isCompleted: boolean },
  ): Promise<TransactionModel> {
    return this.TransactionService.changeTransaction({
      where: { id: id },
      data: TransactionData,
    });
  }

  @Put('transaction/:id')
  async updateTransaction(
    @Param('id') id: string,
    @Body() TransactionData: { giftId: string, userId: string, gifterId: string, isCompleted: boolean },
  ): Promise<TransactionModel> {
    return this.TransactionService.updateTransaction({
      where: { id: id },
      data: TransactionData,
    });
  }

  @Delete('transaction/:id')
  async deleteTransaction(
    @Param('id') id: string
  ): Promise<TransactionModel> {
    return this.TransactionService.deleteTransaction({ id: id });
  }
}