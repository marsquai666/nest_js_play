import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {Post, PrismaClient} from '@prisma/client';

@Injectable()
export class CustomersService {
  async create(createCustomerDto: CreateCustomerDto) {
    // Client初期化
    const prismaClient = new PrismaClient();

    // カスタマーのデータを作成
    const result = await prismaClient.customer.create({
      data: {
        ...createCustomerDto,
        is_active: true,
        posts: {
          create: {
            title: `Joined new user, "${createCustomerDto.name}!!!"`
          }
        }
      }
    });

    return result;
  }

  async findAll() {
    // Client初期化
    const prismaClient = new PrismaClient();

    // 全てのカスタマーを取得
    const customers = await prismaClient.customer.findMany({
      include: {
        posts: true
      },
      where: {
        AND: {
          is_active : true
        }
      }
    });
    return customers;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
