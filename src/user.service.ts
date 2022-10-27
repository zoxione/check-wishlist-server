import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async showUsers(
  ): Promise<User[] | null> {
    return this.prisma.user.findMany({});
  }

  async showUser(
    where: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where,
    });
  }

  async createUser(
    data: Prisma.UserCreateInput
  ): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(
    where: Prisma.UserWhereUniqueInput
  ): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}