import { Module } from '@nestjs/common';
import { MultimediaService } from './multimedia.service';
import { MultimediaController } from './multimedia.controller';
import { Multimedia } from 'src/entities/multimedia.entity';
import { Topic } from 'src/entities/topic.entity';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Multimedia,Topic,User])],
  controllers: [MultimediaController],
  providers: [MultimediaService],
})
export class MultimediaModule {}
