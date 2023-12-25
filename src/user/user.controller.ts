import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException, ConflictException, InternalServerErrorException, Query, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from './public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.create(createUserDto);
      return result;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Unable to create user at this time. Please try again later.',
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.userService.findAll();
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Unable to create user at this time. Please try again later.',
      );
    }
  }

  @Public()
  @Get('/login')
  async signInWithEmailHashedPwRole(
    @Query('email') email: string,
    @Query('password') password: string,
    @Query('role') role: string,
  ) {
    try {
      const result = await this.userService.signIn(email, password, role);
      console.log(result);
      return result;
    } catch (error) {
      if (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }

  @Get('/search')
  async findOneUserByUserId(
    @Query('userId') userId: string,
    @Query('role') role: string,
  ) {
    try {
      const result = await this.userService.findByUserId(userId, role);
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateEmployerDto: UpdateUserDto,
  ): Promise<any> {
    try {
      console.log(updateEmployerDto);
      const result = await this.userService.update(id, updateEmployerDto);
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
    return this.userService.remove(+id);
  }
}
