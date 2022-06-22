import { Module } from '@nestjs/common';
import { ScrapingsService } from './scrapings.service';
import { ScrapingsController } from './scrapings.controller';

@Module({
  controllers: [ScrapingsController],
  providers: [ScrapingsService]
})
export class ScrapingsModule {}
