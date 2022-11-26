import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserModel } from './types';
import { UserService } from './user.service';
import { v4 as uuid } from 'uuid';

@ApiTags('users')
@Controller()
export class UserController {
  constructor(private readonly appService: UserService) { }

  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  getAllUsers(): Promise<UserModel[]> {
    return this.appService.getAllUsers();
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get user' })
  getUser(@Param('id') id: typeof uuid): Promise<UserModel> {
    return this.appService.getUserById(id);
  }

  @Get('user')
  @ApiOperation({ summary: 'Get user by id' })
  getUserById(@Query('id') id: typeof uuid, @Query('username') username: string): Promise<UserModel> | null {
    if (id && username === undefined) {
      return this.appService.getUserById(id);
    }
    else if (username && id === undefined) {
      return this.appService.getUserByUsername(username);
    }
    return null;
  }

  @Post('user')
  @ApiOperation({ summary: 'Create user' })
  createUser(@Body() user: UserModel): Promise<UserModel> {
    return this.appService.createUser(user);
  }

  @Put('user/:id')
  @ApiOperation({ summary: 'Update user' })
  updateUser(@Param('id') id: typeof uuid, @Body() user: UserModel): Promise<UserModel> {
    return this.appService.updateUserById(id, user);
  }

  @Delete('user/:id')
  @ApiOperation({ summary: 'Delete user' })
  deleteUser(@Param('id') id: typeof uuid): Promise<UserModel[]> {
    return this.appService.deleteUserById(id);
  }
}
