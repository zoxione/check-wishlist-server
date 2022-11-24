import { Module } from '@nestjs/common';
// import { UserController } from './user.controller';
// import { GiftController } from './gift.controller';
// import { TransactionController } from './transaction.controller';
import { PrismaService } from './prisma.service';
// import { UserService } from './user.service';
// import { GiftService } from './gift.service';
// import { TransactionService } from './transaction.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
