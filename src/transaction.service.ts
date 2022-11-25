import { Injectable } from '@nestjs/common';
import { supabaseClient } from './supabase';
import { TransactionModel } from './types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TransactionService {
  async getAllTransactions(): Promise<TransactionModel[]> {
    const { data, error } = await supabaseClient
      .from('Transaction')
      .select('*')

    if (error) {
      throw error;
    }

    let response: TransactionModel[] = data;

    return response;
  }

  async getTransactionById(id: typeof uuid): Promise<TransactionModel> {
    const { data, error } = await supabaseClient
      .from('Transaction')
      .select('*')
      .eq('id', id)

    if (error) {
      throw error;
    }

    let response: TransactionModel = data[0];

    return response;
  }

  async createTransaction(transaction: TransactionModel): Promise<TransactionModel[]> {
    const { error } = await supabaseClient
      .from('Transaction')
      .insert(transaction)

    if (error) {
      throw error;
    }

    return await this.getAllTransactions();
  }

  async completeTransaction(id: typeof uuid): Promise<TransactionModel> {
    const { error } = await supabaseClient
      .from('Transaction')
      .update({ isCompleted: true })
      .eq('id', id)

    if (error) {
      throw error;
    }

    return await this.getTransactionById(id);
  }

}
