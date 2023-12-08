import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30 days' }, // user with backend access token is valid for 30 days to call our Backend API routes, to sync with NextAuth's Frontend default 30 days of session
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
