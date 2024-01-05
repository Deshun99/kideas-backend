import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Topic } from 'src/entities/topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  async create(createTopicDto: CreateTopicDto) {
    try {
      const { userId, categoryId, ...dtoExcludingParentId } = createTopicDto;

      const user = await this.userRepository.findOneBy({ userId });
      if (!user) {
        throw new HttpException(
          `User Id provided is not valid`,
          HttpStatus.NOT_FOUND,
        );
      }

      const category = await this.categoryRepository.findOneBy({ categoryId });
      if (!category) {
        throw new HttpException(
          `Category Id provided is not valid`,
          HttpStatus.NOT_FOUND,
        );
      }

      const topic = new Topic({
        ...dtoExcludingParentId,
        user,
        category,
      });

      await this.topicRepository.save(topic);
      
      return {
        statusCode: HttpStatus.OK,
        message: 'Topic created successfully',
        data: topic,
      };
    } catch (err) {
      throw new HttpException(
        err.message || 'An error occurred during the update.',
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllTopics() {
    try {
      const topicList = await this.topicRepository.find({
        relations: {
          user: true,
          multimedias: true,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Topic Found',
        data: topicList,
      };
    } catch (error) {
      throw new NotFoundException('No topic found');
    }
  }

  async findAllSortedTopics() {
    try {
      const topicList = await this.topicRepository.find({
        relations: {
          user: true,
          multimedias: true,
        },
        order: {
          createdAt: 'DESC', 
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Topic Found',
        data: topicList,
      };
    } catch (error) {
      throw new NotFoundException('No topic found');
    }
  }

  async findMyTopics(userId: string) {
    try {
      const myTopics = await this.topicRepository.find({
        relations: {
          user: true,
          multimedias: true,
        },
        where: {
          user: {
            userId,
          },
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Category Found',
        data: myTopics,
      };
    } catch (error) {
      throw new NotFoundException('No topics found');
    }
  }

  async update(id: number, updateTopicDto: UpdateTopicDto) {
    try {
      const topic = await this.topicRepository.findOneBy({
        topicId: id,
      });

      if (!topic) {
        throw new HttpException('Topic id not found', HttpStatus.NOT_FOUND);
      }

      Object.assign(topic, updateTopicDto);

      const updatedTopic = await this.topicRepository.save(topic);

      return {
        statusCode: HttpStatus.OK,
        message: 'Topic have been updated',
        data: updatedTopic,
      };
    } catch (err) {
      throw new HttpException(
        err.message || 'An error occurred during the update.',
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} topic`;
  }
}
