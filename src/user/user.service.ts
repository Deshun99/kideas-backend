import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

      let roleEnum;
      if (createUserDto.role === 'Content_Creator') {
        roleEnum = UserRoleEnum.CONTENT_CREATOR;
      } else {
        roleEnum = UserRoleEnum.ADMIN;
      }

      const newUser = new User({
        userName: userName,
        email: email,
        password: hashedPassword,
        status: UserStatusEnum.ACTIVE,
        role: roleEnum,
      });

      console.log(newUser);

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
        },
        select: ['userId', 'userName', 'email', 'contactNo', 'createdAt', 'status', 'role', 'points']
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

  async signIn(email: string, passwordProvided: string, role: string) {
    try {
      let roleEnum;
      if (role === 'Content_Creator') {
        roleEnum = UserRoleEnum.CONTENT_CREATOR;
      } else if (role === 'Admin') {
        roleEnum = UserRoleEnum.ADMIN;
      } else {
        throw new HttpException(
          'Invalid role specified',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Find the user by email based on the role
      const retrievedUser = await this.userRepository.findOne({
        where : {email}
      });

      if (!retrievedUser) {
        throw new HttpException(
          `User ${email} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      // check if user is inactive or not
      if (retrievedUser.status === UserStatusEnum.INACTIVE) {
        throw new HttpException(
          `User ${email} account status is Inactive. Please contact our Admin if you want to activate back your account.`,
          HttpStatus.NOT_FOUND,
        );
      }

      // Check the password
      const isPasswordCorrect = await bcrypt.compare(
        passwordProvided,
        retrievedUser.password,
      );

      if (!isPasswordCorrect) {
        throw new HttpException(
          'Incorrect password provided',
          HttpStatus.NOT_FOUND,
        );
      }

      // Generate JWT token
      const payload = {
        sub: retrievedUser.userId,
        username: retrievedUser.userName,
        email: retrievedUser.email,
        role: retrievedUser.role,
      };
      const jwtAccessToken = await this.jwtService.signAsync(payload);

      // Return the user data and JWT token
      const { password, ...retrievedUserWithoutPassword } = retrievedUser;
      return {
        statusCode: HttpStatus.OK,
        message: `User ${email} found`,
        data: retrievedUserWithoutPassword,
        jwtAccessToken: jwtAccessToken,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByUserId(userId: string, role: string) {
    try {
      let roleEnum;
      if (role === 'Content_Creator') {
        roleEnum = UserRoleEnum.CONTENT_CREATOR;
      } else if (role === 'Admin') {
        roleEnum = UserRoleEnum.ADMIN;
      }
      const retrievedUser = await this.userRepository.findOne({
        where: { userId: userId, role: roleEnum },
      });

      if (retrievedUser) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Job seeker found',
          data: retrievedUser,
        };
      } else {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        error.response || 'Failed to find user',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOneBy({
        userId: id,
      });

      if (!user) {
        throw new HttpException(
          'Job seeker id not found',
          HttpStatus.NOT_FOUND,
        );
      }

      Object.assign(user, updateUserDto);

      const updatedUser = await this.userRepository.save(user);

      return {
        statusCode: HttpStatus.OK,
        message: 'User particulars have been updated',
        data: updatedUser,
      };
    } catch (err) {
      throw new HttpException(
        err.message || 'An error occurred during the update.',
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
