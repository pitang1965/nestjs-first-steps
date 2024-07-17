import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Auth0Guard } from './auth/auth0.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('public')
  getPublic(): string {
    return this.appService.getPublic();
  }

  @Get('private')
  @UseGuards(Auth0Guard)
  getPrivate() {
    return { message: 'This is protected data' };
  }
}
