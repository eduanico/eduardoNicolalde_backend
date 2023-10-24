import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'papaparse';
import { Data } from './data.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseError } from 'pg';

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
    let errRows: number[] = [];
    dataArray.map((data: Data, index) => {
      this.validateCsvData(data, index, errRows);
    });
    const savedItemsCount = dataArray.length - errRows.length;
    return {
      result: true,
      detail:
        'Número de items con estructura correcta guardados: ' + savedItemsCount,
      errorRows: errRows,
    };
  }

  validId(id: number, index: number): boolean {
    if (!Number.isInteger(Number(id)) || !id) {
      console.log('Id inválido:', id, ', en el item:', index);
      return false;
    }
    return true;
  }

  validBalance(balance: number, index: number): boolean {
    if (!Number.isInteger(Number(balance)) || !balance) {
      console.log(
        'Error en tipo de valor en balance : ',
        balance,
        ', en el item:',
        index,
      );
      return false;
    }
    return true;
  }

  validAccount(account: string, index: number): boolean {
    if (
      !(
        account === 'INTERNAL' ||
        account === 'PEOPLE' ||
        account === 'OPERATIONS'
      )
    ) {
      console.log(
        'Error con el valor de account : ',
        account,
        ', en el item:',
        index,
      );
      return false;
    }
    return true;
  }

  validStatus(status: string, index: number): boolean {
    if (!(status === 'PENDING' || status === 'PROCESSED')) {
      console.log(
        'Error con el valor de status : ',
        status,
        ', en el item:',
        index,
      );
      return false;
    }
    return true;
  }

  validDescription(description: string, index: number): boolean {
    if (description.length > 500) {
      console.log('Descripción con longitud mayor a 500 en el item:', index);
      return false;
    }
    return true;
  }

  validDate(date: any, index: number): boolean {
    try {
      if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(date)) {
        console.log('No es una fecha válida: ', date, ', en el item:', index);
        return false;
      }
      const now = new Date();
      const d = new Date(date);
      if (
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear() &&
        d.getDay() === now.getDay()
      ) {
        return (
          d instanceof Date && !isNaN(d.getTime()) && d.toISOString() === date
        ); // valid date
      }
      console.log('No es hoy: ', date, ', en el item:', index);
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  validateCsvData(row: Data, index: number, errRows: number[]) {
    const isValidId = this.validId(row.id, index);
    const isValidBalance = this.validBalance(row.balance, index);
    const isValidAccount = this.validAccount(row.account, index);
    const isValidDescription = this.validDescription(row.description, index);
    const isValidStatus = this.validStatus(row.status, index);
    const isValidDate = this.validDate(row.date, index);
    try {
      if (
        isValidId &&
        isValidBalance &&
        isValidAccount &&
        isValidDescription &&
        isValidStatus &&
        isValidDate
      ) {
        const createdData = this.dataRepository.create(row);
        this.dataRepository
          .save(createdData)
          .then(() => {
            console.log('Registro guardado exitosamente, item: ', index);
          })
          .catch((err) => {
            console.log('error', err.routine);
            errRows.push(index + 1);
            // throw new DatabaseError(
            //   'Hubo un error durante las validaciones: ' + err.routine,
            //   index,
            //   err.MessageName,
            // );
          });
      } else {
        console.log('Item :', index, 'no guardado por error en validaciones');
        errRows.push(index + 1);
      }
    } catch (err) {
      console.log('Error durante validaciones:', err);
      throw new HttpException(
        'Hubo un error fatal durante las validaciones: ' + err.routine,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getAllData(): Promise<Data[]> {
    try{
      return this.dataRepository.find();
    }catch (err) {
      console.log('Error durante obtención de toda la data:', err);
      throw new HttpException(
        'Hubo un error fatal durante las validaciones: ' + err.routine,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
export const editFileName = (req: any, file: any, callback: any) => {
  callback(null, file.originalname);
};
