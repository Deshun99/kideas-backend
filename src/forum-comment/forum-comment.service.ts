import { Injectable } from '@nestjs/common';
import { CreateForumCommentDto } from './dto/create-forum-comment.dto';
import { UpdateForumCommentDto } from './dto/update-forum-comment.dto';

@Injectable()
export class ForumCommentService {
  create(createForumCommentDto: CreateForumCommentDto) {
    return 'This action adds a new forumComment';
  }

  findAll() {
    return `This action returns all forumComment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forumComment`;
  }

  update(id: number, updateForumCommentDto: UpdateForumCommentDto) {
    return `This action updates a #${id} forumComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} forumComment`;
  }
}
