import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { SuperCustomersController } from './super_customers/super_customers.controller';
import { ScrapingsModule } from './scrapings/scrapings.module';

@Module({
  imports: [CustomersModule, ScrapingsModule],
  controllers: [AppController, SuperCustomersController],
  providers: [AppService],
})
export class AppModule {}
