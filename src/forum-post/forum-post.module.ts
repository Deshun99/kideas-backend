import { Module } from '@nestjs/common';
import { ForumPostService } from './forum-post.service';
import { ForumPostController } from './forum-post.controller';

@Module({
  controllers: [ForumPostController],
  providers: [ForumPostService],
})
export class ForumPostModule {}
