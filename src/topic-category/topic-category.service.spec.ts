import { Test, TestingModule } from '@nestjs/testing';
import { TopicCategoryService } from './topic-category.service';

describe('TopicCategoryService', () => {
  let service: TopicCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicCategoryService],
    }).compile();

    service = module.get<TopicCategoryService>(TopicCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
