import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'papaparse';
import { Data } from './data.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FileReaderService {
  constructor(
    @InjectRepository(Data)
    private dataRepository: Repository<Data>,
  ) {}

  getFileFromFileName(filename: string): Buffer {
    return readFileSync(`files/${filename}`);
  }

  extractContentToString(buffer: Buffer): string {
    return buffer.toString();
  }

  parseCsvContent(content: string): Data[] {
    const parsedCsv = parse(content, {
      header: true,
    });
    const items: Data[] = [];
    parsedCsv.data.map((item: Data) => {
      items.push(item);
    });
    return items;
  }

  validateData(dataArray: Data[]) {
    dataArray.map((data: Data, index) => {
      this.validateCsvData(data, index);
    });
  }

  validateCsvData(row: Data, index: number) {
    if (!Number.isInteger(Number(row.id)) || !row.id) {
      console.log('invalido el id ', row.id, ' en la file:', index + 2);
      return 'invalid roll number';
    } else {
      console.log('Registro guardado exitosamente', row);
      // const createdData = this.dataRepository.create(row);
      this.dataRepository.save(row);
    }
  }

  getAllData(): Promise<Data[]> {
    return this.dataRepository.find();
  }
}
export const editFileName = (req: any, file: any, callback: any) => {
  callback(null, file.originalname);
};
