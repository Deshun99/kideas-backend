import { Injectable } from '@nestjs/common';
import { CreateMultimediaDto } from './dto/create-multimedia.dto';
import { UpdateMultimediaDto } from './dto/update-multimedia.dto';

@Injectable()
export class MultimediaService {
  create(createMultimediaDto: CreateMultimediaDto) {
    return 'This action adds a new multimedia';
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
