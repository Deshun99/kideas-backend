import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopicCommentService } from './topic-comment.service';
import { CreateTopicCommentDto } from './dto/create-topic-comment.dto';
import { UpdateTopicCommentDto } from './dto/update-topic-comment.dto';

@Controller('topic-comment')
export class TopicCommentController {
  constructor(private readonly topicCommentService: TopicCommentService) {}

  @Post()
  create(@Body() createTopicCommentDto: CreateTopicCommentDto) {
    return this.topicCommentService.create(createTopicCommentDto);
  }

  @Get()
  findAll() {
    return this.topicCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicCommentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicCommentDto: UpdateTopicCommentDto) {
    return this.topicCommentService.update(+id, updateTopicCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicCommentService.remove(+id);
  }
}
