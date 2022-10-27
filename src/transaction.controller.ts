import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
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
    @Body() TransactionData: { giftId: string, gifterId: string, isCompleted: boolean },
  ): Promise<TransactionModel> {
    return this.TransactionService.createTransaction(TransactionData);
  }

  @Put('transaction/:id')
  async updateTransaction(
    @Param('id') id: string,
    @Body() TransactionData: { giftId: string, gifterId: string, isCompleted: boolean },
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