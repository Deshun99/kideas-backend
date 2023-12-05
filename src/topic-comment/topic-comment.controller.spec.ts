import { Test, TestingModule } from '@nestjs/testing';
import { TopicCommentController } from './topic-comment.controller';
import { TopicCommentService } from './topic-comment.service';

describe('TopicCommentController', () => {
  let controller: TopicCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicCommentController],
      providers: [TopicCommentService],
    }).compile();

    controller = module.get<TopicCommentController>(TopicCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
