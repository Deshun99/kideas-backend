import { Test, TestingModule } from '@nestjs/testing';
import { ForumPostController } from './forum-post.controller';
import { ForumPostService } from './forum-post.service';

describe('ForumPostController', () => {
  let controller: ForumPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForumPostController],
      providers: [ForumPostService],
    }).compile();

    controller = module.get<ForumPostController>(ForumPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
