import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { SeleniumService } from 'src/selenium/selenium.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, SeleniumService],
})
export class AccountModule {}
