import {
  Controller,
  FileTypeValidator,
  HttpException,
  HttpStatus,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileReaderService, editFileName } from './file-reader.service';
import { Data } from './data.class';

@Controller('api/file-reader')
@ApiTags('file-reader')
export class FileReaderController {
  constructor(private fileReaderService: FileReaderService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
    }),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'csv',
        })
        .build({
          exceptionFactory(error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          },
        }),
    )
    file: Express.Multer.File,
  ) {
    const csv = this.fileReaderService.getFileFromFileName(file.originalname);
    const content = this.fileReaderService.extractContentToString(csv);
    const parsedCsv = this.fileReaderService.parseCsvContent(content);
    parsedCsv.map((item: Data) => {
      console.log(item);
    });
  }
}
