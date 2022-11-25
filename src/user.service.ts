import { Injectable } from '@nestjs/common';
import { supabaseClient } from './supabase';
import { UserModel } from './types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  async getAllUsers(): Promise<UserModel[]> {
    const { data, error } = await supabaseClient
      .from('User')
      .select('*')

    if (error) {
      throw error;
    }

    let user: UserModel[] = data;

    return user;
  }

  async getUserById(id: typeof uuid): Promise<UserModel> {
    const { data, error } = await supabaseClient
      .from('User')
      .select('*')
      .eq('id', id)

    if (error) {
      throw error;
    }

    let user: UserModel = data[0];

    return user;
  }
}
