import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForumCategoryService } from './forum-category.service';
import { CreateForumCategoryDto } from './dto/create-forum-category.dto';
import { UpdateForumCategoryDto } from './dto/update-forum-category.dto';

@Controller('forum-category')
export class ForumCategoryController {
  constructor(private readonly forumCategoryService: ForumCategoryService) {}

  @Post()
  create(@Body() createForumCategoryDto: CreateForumCategoryDto) {
    return this.forumCategoryService.create(createForumCategoryDto);
  }

  @Get()
  findAll() {
    return this.forumCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forumCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForumCategoryDto: UpdateForumCategoryDto) {
    return this.forumCategoryService.update(+id, updateForumCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forumCategoryService.remove(+id);
  }
}
