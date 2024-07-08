import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './images', // destination folder for uploaded files
    }),
  ],
})
export class FileUploadModule {}
