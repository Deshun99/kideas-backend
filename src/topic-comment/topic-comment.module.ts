import { Module } from '@nestjs/common';
import { TopicCommentService } from './topic-comment.service';
import { TopicCommentController } from './topic-comment.controller';

@Module({
  controllers: [TopicCommentController],
  providers: [TopicCommentService],
})
export class TopicCommentModule {}
