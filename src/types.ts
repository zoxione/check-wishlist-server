import { v4 as uuid } from 'uuid';

export interface UserModel {
  id?: typeof uuid;
  username: string;
  fullname?: string;
  email?: string;
  password: string;
  about?: string;
  imageUrl: string;
  backgroundUrl: string;
  address?: string;
  isVerified?: boolean;
  role?: string;
  tiktokName: string;
  twitterName?: string;
  vkName?: string;
  telegramName?: string;
  instagramName?: string;
  createdAt?: Date;
  // updatedAt?: Date;
}

export interface GiftModel {
  id?: typeof uuid;
  title: string;
  description?: string;
  shopName: string;
  shopUrl: string;
  price: number;
  imageUrl?: string;
  isGifted?: boolean;
  userId: string;
  createdAt?: Date;
  // updatedAt?: Date;
}

export interface TransactionModel {
  id?: string;
  giftId: typeof uuid;
  userId: typeof uuid;
  gifterId: typeof uuid;
  isCompleted?: boolean;
  createdAt?: Date;
  // updatedAt?: Date;
}