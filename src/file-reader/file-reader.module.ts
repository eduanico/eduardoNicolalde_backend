import { Module } from '@nestjs/common';
import { FileReaderController } from './file-reader.controller';
import { FileReaderService } from './file-reader.service';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from './data.entity';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    TypeOrmModule.forFeature([Data]),
  ],
  controllers: [FileReaderController],
  providers: [FileReaderService],
})
export class FileReaderModule {}
