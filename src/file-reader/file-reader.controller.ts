import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileReaderService, editFileName } from './file-reader.service';

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
    @Body(new ValidationPipe({ whitelist: true }))
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
    this.fileReaderService.validateData(parsedCsv);
  }

  @Get()
  GetAllData() {
    return this.fileReaderService.getAllData();
  }
}
