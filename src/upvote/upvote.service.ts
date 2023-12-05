import { Injectable } from '@nestjs/common';
import { CreateUpvoteDto } from './dto/create-upvote.dto';
import { UpdateUpvoteDto } from './dto/update-upvote.dto';

@Injectable()
export class UpvoteService {
  create(createUpvoteDto: CreateUpvoteDto) {
    return 'This action adds a new upvote';
  }

  findAll() {
    return `This action returns all upvote`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upvote`;
  }

  update(id: number, updateUpvoteDto: UpdateUpvoteDto) {
    return `This action updates a #${id} upvote`;
  }

  remove(id: number) {
    return `This action removes a #${id} upvote`;
  }
}
