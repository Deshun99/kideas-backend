import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForumCommentService } from './forum-comment.service';
import { CreateForumCommentDto } from './dto/create-forum-comment.dto';
import { UpdateForumCommentDto } from './dto/update-forum-comment.dto';

@Controller('forum-comment')
export class ForumCommentController {
  constructor(private readonly forumCommentService: ForumCommentService) {}

  @Post()
  create(@Body() createForumCommentDto: CreateForumCommentDto) {
    return this.forumCommentService.create(createForumCommentDto);
  }

  @Get()
  findAll() {
    return this.forumCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forumCommentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForumCommentDto: UpdateForumCommentDto) {
    return this.forumCommentService.update(+id, updateForumCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forumCommentService.remove(+id);
  }
}
