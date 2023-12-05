import { Module } from '@nestjs/common';
import { ForumCategoryService } from './forum-category.service';
import { ForumCategoryController } from './forum-category.controller';

@Module({
  controllers: [ForumCategoryController],
  providers: [ForumCategoryService],
})
export class ForumCategoryModule {}
