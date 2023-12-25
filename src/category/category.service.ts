import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const existingCategory = await this.categoryRepository.findOne({
        where: [{categoryTitle: createCategoryDto.categoryTitle}]
      })

      if(existingCategory) {
        throw new HttpException(`Category ${createCategoryDto.categoryTitle} has already been created, Please use a different title.`, HttpStatus.CONFLICT);
      }

      const newCategory = new Category({
        categoryTitle: createCategoryDto.categoryTitle,
        isArchived: false,
      })

      console.log(newCategory);

      await this.categoryRepository.save(newCategory);

      return {
        statusCode: HttpStatus.OK,
        message: 'Category created successfully',
        data: newCategory,
      };
    } catch (err) {
      throw new HttpException(
        err.message || 'An error occurred during the update.',
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const categoryList = await this.categoryRepository.find({
        relations: {
          topics: {
            multimedias: true, 
          },
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Category Found',
        data: categoryList,
      };
    } catch (error) {
      throw new NotFoundException('No users found');
    }
  }

  async findActiveCategory() {
    try {
      const categoryList = await this.categoryRepository.find({
        where: { isArchived: false }
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Category Fpunf',
        data: categoryList,
      };
    } catch (error) {
      throw new NotFoundException('No users found');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.findOneBy({
        categoryId: id,
      });

      if (!category) {
        throw new HttpException(
          'Category id not found',
          HttpStatus.NOT_FOUND,
        );
      }

      Object.assign(category, updateCategoryDto);

      const updatedCategory = await this.categoryRepository.save(category);

      return {
        statusCode: HttpStatus.OK,
        message: 'Category have been updated',
        data: updatedCategory,
      };
    } catch (err) {
      throw new HttpException(
        err.message || 'An error occurred during the update.',
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
