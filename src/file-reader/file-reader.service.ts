import { Injectable } from '@nestjs/common';
import { access, readFileSync } from 'fs';
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
      skipEmptyLines: true,
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

  validateId(id: any, index: number) {
    if (!Number.isInteger(Number(id)) || !id) {
      console.log('Id inválido:', id, ', en la fila:', index + 2);
      return;
    }
  }

  validateCsvData(row: Data, index: number) {
    this.validateId(row.id, index);

    if (!Number.isInteger(Number(row.id)) || !row.id || Number(row.id) == 0) {
      console.log('Id inválido:', row.id, ', en la fila:', index + 2);
      return;
    } else if (!Number.isInteger(Number(row.balance)) || !row.balance) {
      console.log(
        'Error en balance : ',
        row.balance,
        ', en la fila:',
        index + 2,
      );
      return;
    } else if (
      !(
        row.account === 'INTERNAL' ||
        row.account === 'PEOPLE' ||
        row.account === 'OPERATIONS'
      )
    ) {
      console.log(
        'Error con el valor de account : ',
        row.account,
        ', en la fila:',
        index + 2,
      );
      return;
    } else if (
      !(
        row.account === 'INTERNAL' ||
        row.account === 'PEOPLE' ||
        row.account === 'OPERATIONS'
      )
    ) {
      console.log(
        'Error con el valor de account : ',
        row.account,
        ', en la fila:',
        index + 2,
      );
      return;
    } else {
      const createdData = this.dataRepository.create(row);
      this.dataRepository.save(createdData).then((data) => {
        console.log('Registro guardado exitosamente', data);
      });
      // .catch((err) => {
      //   console.log('error', err.routine);
      // });
    }
  }

  getAllData(): Promise<Data[]> {
    return this.dataRepository.find();
  }
}
export const editFileName = (req: any, file: any, callback: any) => {
  callback(null, file.originalname);
};
