import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { SeleniumModule } from './selenium/selenium.module';

@Module({
  imports: [AccountModule, SeleniumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
