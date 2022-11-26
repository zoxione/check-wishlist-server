import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionModel } from './types';
import { TransactionService } from './transaction.service';
import { v4 as uuid } from 'uuid';

@ApiTags('transactions')
@Controller()
export class TransactionController {
  constructor(private readonly appService: TransactionService) { }

  @Get('transactions')
  @ApiOperation({ summary: 'Get all transactions' })
  getAllTransactions(@Query('userId') userId: typeof uuid): Promise<any[]> {
    if (userId) {
      return this.appService.getAllTransactionsByUserId(userId);
    }
    else {
      return this.appService.getAllTransactions();
    }
  }

  @Get('transactions/:id')
  @ApiOperation({ summary: 'Get transaction' })
  getTransaction(@Param('id') id: typeof uuid): Promise<TransactionModel> {
    return this.appService.getTransactionById(id);
  }

  @Post('transactions')
  @ApiOperation({ summary: 'Create transaction' })
  createTransaction(@Body() transaction: TransactionModel): Promise<TransactionModel[]> {
    return this.appService.createTransaction(transaction);
  }

  @Patch('transactions_complete/:id')
  @ApiOperation({ summary: 'Complete transaction' })
  completeTransaction(@Param('id') id: typeof uuid): Promise<TransactionModel> {
    return this.appService.completeTransaction(id);
  }
}
