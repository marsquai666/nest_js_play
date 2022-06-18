import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Next, Req, Header, Headers, HttpStatus, HttpCode } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { IncomingMessage } from 'http';
import { IncomingHttpHeaders } from 'http2';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';


function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }

 console.log('called makeid function');

 return result;
}

@Controller({host: 'localhost', path: 'customers'})
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {
    console.log('instantiate CustomersController');
  }

  @Post()
  create(@Req() req: Request, @Body() createCustomerDto: CreateCustomerDto) {
    console.log(req);
    console.log(createCustomerDto);
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @HttpCode(HttpStatus.CREATED)
  findAll() {
    // const promise = new Promise<string>((resolve, reject) => {
    //   setInterval(() => {
    //     resolve('Hello World');
    //   }, 3000);
    // });

    // const result = await promise;

    // return result;
    return this.customersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Param('name') name: string) {
    const prismaClient = new PrismaClient();
    const result = await prismaClient.customer.findUnique({
      where: {
        id: Number(id)
      }
    });
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    const prismaClient = new PrismaClient();
    const result = await prismaClient.customer.update({
      where: {
        id: Number(id)
      },
      data: updateCustomerDto
    });

    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const prismaClient = new PrismaClient();
    const result = await prismaClient.customer.delete({
      where: {
        id: Number(id)
      }
    });

    return result;
  }
}
