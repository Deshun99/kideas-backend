import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpvoteService } from './upvote.service';
import { CreateUpvoteDto } from './dto/create-upvote.dto';
import { UpdateUpvoteDto } from './dto/update-upvote.dto';

@Controller('upvote')
export class UpvoteController {
  constructor(private readonly upvoteService: UpvoteService) {}

  @Post()
  create(@Body() createUpvoteDto: CreateUpvoteDto) {
    return this.upvoteService.create(createUpvoteDto);
  }

  @Get()
  findAll() {
    return this.upvoteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.upvoteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUpvoteDto: UpdateUpvoteDto) {
    return this.upvoteService.update(+id, updateUpvoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.upvoteService.remove(+id);
  }
}
