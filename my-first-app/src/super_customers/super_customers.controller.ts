import { Controller, Get, HostParam } from '@nestjs/common';

@Controller({host: ':user.com', path: 'customers'})
export class SuperCustomersController {
  @Get()
  get(@HostParam('user') user: string){
    return {
      message: `this is ${user} page`
    }
  }
}
