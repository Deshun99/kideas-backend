import {
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Public } from 'src/user/public.decorator';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg/md'}),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log("Uploading file");
    console.log(file);
    console.log('File Upload Controller');
    return await this.uploadService.upload(file.originalname, file.buffer);
  }

  @Public()
  @Post('/removeFile')
  async removeFile(
    @Query('fileName') fileName: string
  ) {
    try {
      return await this.uploadService.remove(fileName);
    } catch (error) {
      if (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }
}
