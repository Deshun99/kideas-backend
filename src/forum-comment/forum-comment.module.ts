import { Module } from '@nestjs/common';
import { ForumCommentService } from './forum-comment.service';
import { ForumCommentController } from './forum-comment.controller';

@Module({
  controllers: [ForumCommentController],
  providers: [ForumCommentService],
})
export class ForumCommentModule {}
