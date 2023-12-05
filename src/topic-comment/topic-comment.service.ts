import { Injectable } from '@nestjs/common';
import { CreateTopicCommentDto } from './dto/create-topic-comment.dto';
import { UpdateTopicCommentDto } from './dto/update-topic-comment.dto';

@Injectable()
export class TopicCommentService {
  create(createTopicCommentDto: CreateTopicCommentDto) {
    return 'This action adds a new topicComment';
  }

  findAll() {
    return `This action returns all topicComment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topicComment`;
  }

  update(id: number, updateTopicCommentDto: UpdateTopicCommentDto) {
    return `This action updates a #${id} topicComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} topicComment`;
  }
}
