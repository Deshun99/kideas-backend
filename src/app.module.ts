import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entityList } from './entityList';
import { UserModule } from './user/user.module';
import { TopicModule } from './topic/topic.module';
import { MultimediaModule } from './multimedia/multimedia.module';
import { UpvoteModule } from './upvote/upvote.module';
import { UploadModule } from './upload/upload.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { ChatModule } from './chat/chat.module';
import { ChatMessageModule } from './chat-message/chat-message.module';
import { ConfigModule } from '@nestjs/config';

require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST_URL,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: entityList,
      synchronize: true,
      timezone: '+08:00',
    }),
    UserModule,
    TopicModule,
    MultimediaModule,
    UpvoteModule,
    UploadModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
    CommentModule,
    ChatModule,
    ChatMessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
