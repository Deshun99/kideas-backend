import { ConflictException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import UserStatusEnum from 'src/enums/userStatus.enum';
import UserRoleEnum from 'src/enums/userRole.enum';

require('dotenv').config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async checkForDuplicates(userName: string, email: string) {
    const existingUser = await this.userRepository.findOne({
      where: [{ userName }, { email }],
    });

    if (existingUser) {
      if (existingUser.userName === userName) {
        throw new ConflictException(
          `Username ${userName} has already been used. Please use a different username.`,
        );
      }

      if (existingUser.email === email) {
        throw new ConflictException(
          `Email ${email} has already been used. Please use a different email.`,
        );
      }
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { userName, email, password } = createUserDto;
      await this.checkForDuplicates(userName, email);

      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.BCRYPT_HASH),
      );

      const newUser = new User({
        ...createUserDto,
        password: hashedPassword,
        status: UserStatusEnum.ACTIVE,
        role: UserRoleEnum.CONTENT_CREATOR,
      });

      await this.userRepository.save(newUser);

      return {
        statusCode: HttpStatus.OK,
        message: 'User created successfully',
        data: newUser,
      };
    } catch (error) {
      if (error.status === HttpStatus.CONFLICT) {
        throw new ConflictException(error.message);
      }
      throw new InternalServerErrorException(
        'An error occurred while creating the user.',
      );
    }
  }

  async findAll() {
    try {
      const userList = await this.userRepository.find({
        relations: {
          topics: true,
          comments: true,
        }
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Users found',
        data: userList,
      };
    } catch (error) {
      throw new NotFoundException("No users found");
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
