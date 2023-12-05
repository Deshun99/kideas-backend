import { Test, TestingModule } from '@nestjs/testing';
import { TopicCategoryController } from './topic-category.controller';
import { TopicCategoryService } from './topic-category.service';

describe('TopicCategoryController', () => {
  let controller: TopicCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicCategoryController],
      providers: [TopicCategoryService],
    }).compile();

    controller = module.get<TopicCategoryController>(TopicCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
