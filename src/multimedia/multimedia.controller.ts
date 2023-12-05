import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MultimediaService } from './multimedia.service';
import { CreateMultimediaDto } from './dto/create-multimedia.dto';
import { UpdateMultimediaDto } from './dto/update-multimedia.dto';

@Controller('multimedia')
export class MultimediaController {
  constructor(private readonly multimediaService: MultimediaService) {}

  @Post()
  create(@Body() createMultimediaDto: CreateMultimediaDto) {
    return this.multimediaService.create(createMultimediaDto);
  }

  @Get()
  findAll() {
    return this.multimediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.multimediaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMultimediaDto: UpdateMultimediaDto) {
    return this.multimediaService.update(+id, updateMultimediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.multimediaService.remove(+id);
  }
}
