import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicCommentDto } from './create-topic-comment.dto';

export class UpdateTopicCommentDto extends PartialType(CreateTopicCommentDto) {}
