import { Injectable } from '@nestjs/common';
import { PutObjectCommand, DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config/dist';

require('dotenv').config();

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file: Buffer) {
    const contentType = this.getContentTypeByFile(fileName);

    console.log(contentType);

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
        Body: file,
        ContentType: contentType,
      }),
    );

    const s3Url = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`;

    console.log(s3Url);

    return { url: s3Url };
  }

  async remove(url: string): Promise<void> {
    const fileName = this.extractFileNameFromUrl(url);
    console.log(fileName);
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
      }),
    );
    console.log(fileName, 'is removed');
  }

  private extractFileNameFromUrl(url: string): string | null {
    const regex = /https:\/\/.+\.s3\..+\.amazonaws\.com\/([^"]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  private getContentTypeByFile(fileName: string): string {
    const fileExtension = fileName.split('.').pop().toLowerCase();

    console.log('File type');
    console.log(fileExtension);
    switch (fileExtension) {
      case 'jpeg':
      case 'jpg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      case 'pdf':
        return 'application/pdf';
      // Add other file extensions and MIME types as needed
      default:
        return 'application/octet-stream'; // Fallback to binary if unknown type
    }
  }
}
