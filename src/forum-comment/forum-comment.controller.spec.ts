import { Test, TestingModule } from '@nestjs/testing';
import { ForumCommentController } from './forum-comment.controller';
import { ForumCommentService } from './forum-comment.service';

describe('ForumCommentController', () => {
  let controller: ForumCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForumCommentController],
      providers: [ForumCommentService],
    }).compile();

    controller = module.get<ForumCommentController>(ForumCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
