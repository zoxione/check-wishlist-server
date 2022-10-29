import { Controller, Get, Param, Post, Body, Put, Delete, HttpException } from '@nestjs/common';
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

  @Get('user/:username')
  async showUser(
    @Param('username') username: string,
  ): Promise<UserModel> {
    return this.userService.showUser(
      { username: username }
    );
  }

  @Post('user_login')
  async loginUser(
    @Body() data: { email: string, password: string }
  ): Promise<{}> {
    const user = this.userService.loginUser({
      data: { email: data.email },
    });
    if ((await user).password === data.password) {
      return user;
    }
    else {
      throw new HttpException('Wrong password', 401);
    }
  }

  @Post('user')
  async createUser(
    @Body() userData: { username: string, fullname: string, email: string, password: string, about: string, imageUrl: string, backgroundUrl: string, isVerified: boolean, address: string, tiktokName: string, twitterName: string, vkName: string, telegramName: string, instagramName: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: { username: string, fullname: string, email: string, password: string, about: string, imageUrl: string, backgroundUrl: string, isVerified: boolean, address: string, tiktokName: string, twitterName: string, vkName: string, telegramName: string, instagramName: string },
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