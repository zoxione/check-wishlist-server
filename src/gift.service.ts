import { Injectable } from '@nestjs/common';
import { supabaseClient } from './supabase';
import { GiftModel, TransactionModel } from './types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class GiftService {
  async getAllGifts(): Promise<GiftModel[]> {
    const { data, error } = await supabaseClient
      .from('Gift')
      .select('*')

    if (error) {
      throw error;
    }

    return data as GiftModel[];
  }

  async getAllGiftsByUserId(userId: typeof uuid): Promise<GiftModel[]> {
    const { data, error } = await supabaseClient
      .from('Gift')
      .select('*')
      .eq('userId', userId)

    if (error) {
      throw error;
    }

    return data as GiftModel[];
  }

  async getGiftById(id: typeof uuid): Promise<GiftModel> {
    const { data, error } = await supabaseClient
      .from('Gift')
      .select('*')
      .eq('id', id)

    if (error) {
      throw error;
    }

    return data[0] as GiftModel;
  }

  async createGift(gift: GiftModel): Promise<GiftModel[]> {
    const { error } = await supabaseClient
      .from('Gift')
      .insert(gift)

    if (error) {
      throw error;
    }

    return await this.getAllGifts();
  }

  async updateGiftById(id: typeof uuid, gift: GiftModel): Promise<GiftModel> {
    const { error } = await supabaseClient
      .from('Gift')
      .update(gift)
      .eq('id', id)

    if (error) {
      throw error;
    }

    return await this.getGiftById(id);
  }

  async giveGift(transaction: TransactionModel): Promise<GiftModel> {
    const { error } = await supabaseClient
      .from('Gift')
      .update({ isGifted: true })
      .eq('id', transaction.giftId)

    if (error) {
      throw error;
    }

    const { error: error2 } = await supabaseClient
      .from('Transaction')
      .insert(transaction)

    if (error2) {
      throw error2;
    }

    return await this.getGiftById(transaction.giftId);
  }

  async deleteGiftById(id: typeof uuid): Promise<GiftModel[]> {
    const { error } = await supabaseClient
      .from('Gift')
      .delete()
      .eq('id', id)

    if (error) {
      throw error;
    }

    return await this.getAllGifts();
  }

  async deleteGiftedGiftsByUserId(userId: typeof uuid): Promise<GiftModel[]> {
    const { error: error1 } = await supabaseClient
      .from('Transaction')
      .delete()
      .eq('userId', userId)

    if (error1) {
      throw error1;
    }

    const { error } = await supabaseClient
      .from('Gift')
      .delete()
      .eq('userId', userId)
      .eq('isGifted', true)

    if (error) {
      throw error;
    }

    return await this.getAllGifts();
  }

  async deleteWishlistGiftsByUserId(userId: typeof uuid): Promise<GiftModel[]> {
    const { error } = await supabaseClient
      .from('Gift')
      .delete()
      .eq('userId', userId)
      .eq('isGifted', false)

    console.log("deleteWishlistGiftsByUserId");

    if (error) {
      throw error;
    }

    return await this.getAllGifts();
  }
}
