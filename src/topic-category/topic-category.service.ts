import { Injectable } from '@nestjs/common';
import { CreateTopicCategoryDto } from './dto/create-topic-category.dto';
import { UpdateTopicCategoryDto } from './dto/update-topic-category.dto';

@Injectable()
export class TopicCategoryService {
  create(createTopicCategoryDto: CreateTopicCategoryDto) {
    return 'This action adds a new topicCategory';
  }

  findAll() {
    return `This action returns all topicCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topicCategory`;
  }

  update(id: number, updateTopicCategoryDto: UpdateTopicCategoryDto) {
    return `This action updates a #${id} topicCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} topicCategory`;
  }
}
