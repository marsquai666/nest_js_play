import { Test, TestingModule } from '@nestjs/testing';
import { ScrapingsService } from './scrapings.service';

describe('ScrapingsService', () => {
  let service: ScrapingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScrapingsService],
    }).compile();

    service = module.get<ScrapingsService>(ScrapingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
