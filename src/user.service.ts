import { Injectable } from '@nestjs/common';
import { supabaseClient } from './supabase';
import { UserModel } from './types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  async loginUser(email: string, password: string): Promise<UserModel> {
    const { data, error } = await supabaseClient
      .from('User')
      .select('*')
      .eq('email', email)
      .eq('password', password)

    if (error) {
      throw error;
    }

    return data[0] as UserModel;
  }


  async getAllUsers(): Promise<UserModel[]> {
    const { data, error } = await supabaseClient
      .from('User')
      .select('*')

    if (error) {
      throw error;
    }

    return data as UserModel[];
  }

  async getUserById(id: typeof uuid): Promise<UserModel> {
    const { data, error } = await supabaseClient
      .from('User')
      .select('*')
      .eq('id', id)

    if (error) {
      throw error;
    }

    return data[0] as UserModel;
  }

  async getUserByUsername(username: string): Promise<UserModel> {
    const { data, error } = await supabaseClient
      .from('User')
      .select('*')
      .eq('username', username)

    if (error) {
      throw error;
    }

    return data[0] as UserModel;
  }

  async createUser(user: UserModel): Promise<UserModel> {
    const { error } = await supabaseClient
      .from('User')
      .insert(user)

    if (error) {
      throw error;
    }

    return await this.getUserByUsername(user.username);
  }

  async updateUserById(id: typeof uuid, user: UserModel): Promise<UserModel> {
    const { error } = await supabaseClient
      .from('User')
      .update(user)
      .eq('id', id)

    if (error) {
      throw error;
    }

    return await this.getUserById(id);
  }

  async deleteUserById(id: typeof uuid): Promise<UserModel[]> {
    const { error: error1 } = await supabaseClient
      .from('Transaction')
      .delete()
      .eq('userId', id)

    if (error1) {
      throw error1;
    }

    const { error: error2 } = await supabaseClient
      .from('Transaction')
      .delete()
      .eq('gifterId', id)

    if (error2) {
      throw error1;
    }

    const { error } = await supabaseClient
      .from('User')
      .delete()
      .eq('id', id)

    if (error) {
      throw error;
    }

    return await this.getAllUsers();
  }

}
