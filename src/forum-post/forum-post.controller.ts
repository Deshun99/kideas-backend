import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForumPostService } from './forum-post.service';
import { CreateForumPostDto } from './dto/create-forum-post.dto';
import { UpdateForumPostDto } from './dto/update-forum-post.dto';

@Controller('forum-post')
export class ForumPostController {
  constructor(private readonly forumPostService: ForumPostService) {}

  @Post()
  create(@Body() createForumPostDto: CreateForumPostDto) {
    return this.forumPostService.create(createForumPostDto);
  }

  @Get()
  findAll() {
    return this.forumPostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forumPostService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForumPostDto: UpdateForumPostDto) {
    return this.forumPostService.update(+id, updateForumPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forumPostService.remove(+id);
  }
}
