import { Test, TestingModule } from '@nestjs/testing';
import { MultimediaController } from './multimedia.controller';
import { MultimediaService } from './multimedia.service';

describe('MultimediaController', () => {
  let controller: MultimediaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultimediaController],
      providers: [MultimediaService],
    }).compile();

    controller = module.get<MultimediaController>(MultimediaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
