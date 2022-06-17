import { Test, TestingModule } from '@nestjs/testing';
import { SuperCustomersController } from './super_customers.controller';

describe('SuperCustomersController', () => {
  let controller: SuperCustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperCustomersController],
    }).compile();

    controller = module.get<SuperCustomersController>(SuperCustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
