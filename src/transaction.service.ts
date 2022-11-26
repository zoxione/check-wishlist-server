import { Injectable } from '@nestjs/common';
import { supabaseClient } from './supabase';
import { TransactionModel } from './types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TransactionService {
  async getAllTransactions(): Promise<any[]> {
    const { data, error } = await supabaseClient
      .from('Transaction')
      .select(`
        *,
        Gift(*),
        Gifter:gifterId(*),
        User:userId(*)
      `)

    if (error) {
      throw error;
    }

    return data;
  }

  async getAllTransactionsByUserId(userId: typeof uuid): Promise<any[]> {
    const { data, error } = await supabaseClient
      .from('Transaction')
      .select(`
        *,
        Gift(*),
        Gifter:gifterId(*),
        User:userId(*)
      `)
      .eq('userId', userId)

    if (error) {
      throw error;
    }

    return data;
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
