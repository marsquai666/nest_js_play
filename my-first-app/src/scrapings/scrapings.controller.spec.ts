import { Test, TestingModule } from '@nestjs/testing';
import { ScrapingsController } from './scrapings.controller';
import { ScrapingsService } from './scrapings.service';

describe('ScrapingsController', () => {
  let controller: ScrapingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScrapingsController],
      providers: [ScrapingsService],
    }).compile();

    controller = module.get<ScrapingsController>(ScrapingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
