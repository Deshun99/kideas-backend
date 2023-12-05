import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entityList } from './entityList';
import { UserModule } from './user/user.module';
import { ForumCategoryModule } from './forum-category/forum-category.module';
import { ForumPostModule } from './forum-post/forum-post.module';
import { ForumCommentModule } from './forum-comment/forum-comment.module';
import { TopicModule } from './topic/topic.module';
import { TopicCategoryModule } from './topic-category/topic-category.module';
import { TopicCommentModule } from './topic-comment/topic-comment.module';
import { MultimediaModule } from './multimedia/multimedia.module';
import { UpvoteModule } from './upvote/upvote.module';
import { UploadModule } from './upload/upload.module';

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
    ForumCategoryModule,
    ForumPostModule,
    ForumCommentModule,
    TopicModule,
    TopicCategoryModule,
    TopicCommentModule,
    MultimediaModule,
    UpvoteModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
