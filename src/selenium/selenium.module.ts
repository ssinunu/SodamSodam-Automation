import { Global, Module } from '@nestjs/common';
import { SeleniumService } from './selenium.service';

@Global()
@Module({
  providers: [SeleniumService],
  exports: [SeleniumService],
})
export class SeleniumModule {}
