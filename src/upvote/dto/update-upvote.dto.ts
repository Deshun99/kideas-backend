import { PartialType } from '@nestjs/mapped-types';
import { CreateUpvoteDto } from './create-upvote.dto';

export class UpdateUpvoteDto extends PartialType(CreateUpvoteDto) {}
