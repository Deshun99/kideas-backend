import { Injectable } from '@nestjs/common';
import { CreateForumCategoryDto } from './dto/create-forum-category.dto';
import { UpdateForumCategoryDto } from './dto/update-forum-category.dto';

@Injectable()
export class ForumCategoryService {
  create(createForumCategoryDto: CreateForumCategoryDto) {
    return 'This action adds a new forumCategory';
  }

  findAll() {
    return `This action returns all forumCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forumCategory`;
  }

  update(id: number, updateForumCategoryDto: UpdateForumCategoryDto) {
    return `This action updates a #${id} forumCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} forumCategory`;
  }
}
