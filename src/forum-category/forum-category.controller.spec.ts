import { Test, TestingModule } from '@nestjs/testing';
import { ForumCategoryController } from './forum-category.controller';
import { ForumCategoryService } from './forum-category.service';

describe('ForumCategoryController', () => {
  let controller: ForumCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForumCategoryController],
      providers: [ForumCategoryService],
    }).compile();

    controller = module.get<ForumCategoryController>(ForumCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
