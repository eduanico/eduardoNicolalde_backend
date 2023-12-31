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
  ParseFilePipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileReaderService, editFileName } from './file-reader.service';

@Controller('api/file-reader')
@ApiTags('file-reader')
export class FileReaderController {
  constructor(private fileReaderService: FileReaderService) {}

  //ejercicio 5
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
    //Validar que el archivo no esté vacío
    if (file.size == 1) {
      console.log('file must not be empty');
      throw new HttpException('El archivo no debe estar vacío', HttpStatus.BAD_REQUEST);
    }
    const csv = this.fileReaderService.getFileFromFileName(file.originalname);
    const content = this.fileReaderService.extractContentToString(csv);
    const parsedCsv = this.fileReaderService.parseCsvContent(content);
    //Validar que el archivo tenga filas
    if (parsedCsv.length == 0) {
      console.log('file have no rows');
      throw new HttpException('El archivo no tiene contenido', HttpStatus.BAD_REQUEST);
    }
    return this.fileReaderService.validateData(parsedCsv);
  }

  @Get()
  GetAllData() {
    return this.fileReaderService.getAllData();
  }
}
