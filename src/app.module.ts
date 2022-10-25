import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { GiftService } from './gift.service';
// import { TransactionService } from './transaction.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService, UserService, GiftService],
})
export class AppModule { }
