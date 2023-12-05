import { Test, TestingModule } from '@nestjs/testing';
import { TopicCommentService } from './topic-comment.service';

describe('TopicCommentService', () => {
  let service: TopicCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicCommentService],
    }).compile();

    service = module.get<TopicCommentService>(TopicCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
