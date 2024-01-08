import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMultimediaDto } from './dto/create-multimedia.dto';
import { UpdateMultimediaDto } from './dto/update-multimedia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Multimedia } from 'src/entities/multimedia.entity';
import { Repository } from 'typeorm';
import { Topic } from 'src/entities/topic.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class MultimediaService {
  constructor(
    @InjectRepository(Multimedia)
    private readonly multimediaRepository: Repository<Multimedia>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  async create(createMultimediaDto: CreateMultimediaDto) {
    try {
      const { userId, topicId, ...dtoExcludingParentId } =
        createMultimediaDto;

      const user = await this.userRepository.findOneBy({ userId });
      if (!user) {
        throw new HttpException(
          `User Id provided is not valid`,
          HttpStatus.NOT_FOUND,
        );
      }

      const topic = await this.topicRepository.findOneBy({ topicId });
      if (!topic) {
        throw new HttpException(
          `Topic Id provided is not valid`,
          HttpStatus.NOT_FOUND,
        );
      }

      const multimedia = new Multimedia({
        ...dtoExcludingParentId,
        user,
        topic,
      });

      await this.multimediaRepository.save(multimedia);

      return {
        statusCode: HttpStatus.OK,
        message: 'Multimedia created successfully',
        data: multimedia,
      };
    } catch (err) {
      throw new HttpException(
        err.message || 'An error occurred during the update.',
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all multimedia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} multimedia`;
  }

  update(id: number, updateMultimediaDto: UpdateMultimediaDto) {
    return `This action updates a #${id} multimedia`;
  }

  remove(id: number) {
    return `This action removes a #${id} multimedia`;
  }
}
