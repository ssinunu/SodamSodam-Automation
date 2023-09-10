import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Post('login')
  login(@Body() loginUserData: LoginUserDto) {
    const result = this.accountService.login(loginUserData);
  }
}
