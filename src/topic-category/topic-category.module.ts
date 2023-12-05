import { Module } from '@nestjs/common';
import { TopicCategoryService } from './topic-category.service';
import { TopicCategoryController } from './topic-category.controller';

@Module({
  controllers: [TopicCategoryController],
  providers: [TopicCategoryService],
})
export class TopicCategoryModule {}
