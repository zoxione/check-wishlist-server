import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserModel } from './types';
import { UserService } from './user.service';
import { v4 as uuid } from 'uuid';

@ApiTags('users')
@Controller()
export class UserController {
  constructor(private readonly appService: UserService) { }

  @Post('users_login')
  @ApiOperation({ summary: 'Login' })
  loginUser(@Body() data: { email: string, password: string }): Promise<UserModel> {
    console.log(data)
    return this.appService.loginUser(data.email, data.password);
  }

  @Get('users')
  @ApiOperation({ summary: 'Get users' })
  getUsers(@Query('id') id: typeof uuid, @Query('username') username: string): Promise<UserModel[]> | Promise<UserModel> | null {
    if (id && username === undefined) {
      return this.appService.getUserById(id);
    }
    else if (username && id === undefined) {
      return this.appService.getUserByUsername(username);
    }
    else if (id === undefined && username === undefined) {
      return this.appService.getAllUsers();
    }
    return null;
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get user' })
  getUser(@Param('id') id: typeof uuid): Promise<UserModel> {
    return this.appService.getUserById(id);
  }

  @Post('users')
  @ApiOperation({ summary: 'Create user' })
  createUser(@Body() user: UserModel): Promise<UserModel> {
    return this.appService.createUser(user);
  }

  @Put('users/:id')
  @ApiOperation({ summary: 'Update user' })
  updateUser(@Param('id') id: typeof uuid, @Body() user: UserModel): Promise<UserModel> {
    return this.appService.updateUserById(id, user);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete user' })
  deleteUser(@Param('id') id: typeof uuid): Promise<UserModel[]> {
    return this.appService.deleteUserById(id);
  }
}
