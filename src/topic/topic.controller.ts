import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, InternalServerErrorException, NotFoundException, Put, Query } from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Public } from 'src/user/public.decorator';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  async create(@Body() createTopicDto: CreateTopicDto) {
    try {
      const result = await this.topicService.create(createTopicDto);
      console.log(result);
      return result;
    } catch (error) {
      if (error) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      throw new InternalServerErrorException(
        'Unable to create topic at this time. Please try again later.',
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.topicService.findAllTopics();
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Unable to retrieve topic this time. Please try again later.',
      );
    }
  }

  @Public()
  @Get('/sorted')
  async findAllSorted() {
    try {
      const result = await this.topicService.findAllSortedTopics();
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Unable to retrieve topic this time. Please try again later.',
      );
    }
  }

  @Get('/myTopic')
  async findMyTopic(@Query('userId') userId: string) {
    try {
      const result = await this.topicService.findMyTopics(userId);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Unable to find topic this time. Please try again later.',
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTopicDto: UpdateTopicDto,
  ) {
    try {
      console.log(updateTopicDto);
      const result = await this.topicService.update(id, updateTopicDto);
      console.log(result);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicService.remove(+id);
  }
}
