import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpStatus, HttpException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public } from 'src/user/public.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      console.log(createCategoryDto);
      const result = await this.categoryService.create(createCategoryDto);
      return result;
    } catch (error) {
      if (error) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      throw new InternalServerErrorException(
        'Unable to create category at this time. Please try again later.',
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.categoryService.findAll();
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Unable to retrieve category this time. Please try again later.',
      );
    }
  }

  @Public()
  @Get('/public')
  async findAllActiveCategory() {
    try {
      const result = await this.categoryService.findActiveCategory();
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Unable to retrieve category this time. Please try again later.',
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      console.log(updateCategoryDto);
      const result = await this.categoryService.update(id, updateCategoryDto);
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
  async remove(@Param('id') id: number) {
    try {
      return this.categoryService.remove(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else {
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }
}
