import { Module } from '@nestjs/common';
import { FileReaderController } from './file-reader.controller';
import { FileReaderService } from './file-reader.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [FileReaderController],
  providers: [FileReaderService],
})
export class FileReaderModule {}
