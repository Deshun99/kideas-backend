import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicCategoryDto } from './create-topic-category.dto';

export class UpdateTopicCategoryDto extends PartialType(CreateTopicCategoryDto) {}
