import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ProductService } from './services/product.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ProductService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });
});
