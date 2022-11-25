import { Controller, Get, Param } from '@nestjs/common';
import { UserModel } from './types';
import { UserService } from './user.service';
import { v4 as uuid } from 'uuid';

@Controller()
export class UserController {
  constructor(private readonly appService: UserService) { }

  @Get('user')
  getAllUsers(): Promise<UserModel[]> {
    return this.appService.getAllUsers();
  }

  @Get('user/:id')
  getUserById(@Param('id') id: typeof uuid): Promise<UserModel> {
    return this.appService.getUserById(id);
  }
}
