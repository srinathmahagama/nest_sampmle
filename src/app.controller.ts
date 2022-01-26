import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('message_printed')
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log(data.text);
 }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
