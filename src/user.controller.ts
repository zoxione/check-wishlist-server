import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('user')
  async showUsers(
  ): Promise<UserModel[]> {
    return this.userService.showUsers();
  }

  @Get('user/:id')
  async showUser(
    @Param('id') id: string,
  ): Promise<UserModel> {
    return this.userService.showUser(
      { id: id }
    );
  }

  @Post('user')
  async createUser(
    @Body() userData: { name: string; email: string, password: string, imageUrl: string, coverUrl: string, address: string, tiktokName: string, twitterName: string, vkName: string, tgName: string, instagramName: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: { name: string; email: string, password: string, imageUrl: string, coverUrl: string, address: string, tiktokName: string, twitterName: string, vkName: string, tgName: string, instagramName: string },
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: id },
      data: userData,
    });
  }

  @Delete('user/:id')
  async deleteUser(
    @Param('id') id: string
  ): Promise<UserModel> {
    return this.userService.deleteUser({ id: id });
  }
}