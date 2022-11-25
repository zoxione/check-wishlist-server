import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GiftController } from './gift.controller';
import { GiftService } from './gift.service';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, GiftController, TransactionController],
  providers: [AppService, UserService, GiftService, TransactionService],
})
export class AppModule { }
