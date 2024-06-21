import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './login/local-auth.guard';

@Controller('profile')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @UseGuards()
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @UseGuards(LocalAuthGuard)
  @Get()
  getProfile(@Request() req) {
    return req.user;
  }
}
