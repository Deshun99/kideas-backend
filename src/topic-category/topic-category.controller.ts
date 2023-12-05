import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopicCategoryService } from './topic-category.service';
import { CreateTopicCategoryDto } from './dto/create-topic-category.dto';
import { UpdateTopicCategoryDto } from './dto/update-topic-category.dto';

@Controller('topic-category')
export class TopicCategoryController {
  constructor(private readonly topicCategoryService: TopicCategoryService) {}

  @Post()
  create(@Body() createTopicCategoryDto: CreateTopicCategoryDto) {
    return this.topicCategoryService.create(createTopicCategoryDto);
  }

  @Get()
  findAll() {
    return this.topicCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicCategoryDto: UpdateTopicCategoryDto) {
    return this.topicCategoryService.update(+id, updateTopicCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicCategoryService.remove(+id);
  }
}
