import { PartialType } from '@nestjs/mapped-types';
import { CreateForumCategoryDto } from './create-forum-category.dto';

export class UpdateForumCategoryDto extends PartialType(CreateForumCategoryDto) {}
