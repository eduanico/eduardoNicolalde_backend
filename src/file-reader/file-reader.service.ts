import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'papaparse';

@Injectable()
export class FileReaderService {
  getFileFromFileName(filename: string): Buffer {
    return readFileSync(`files/${filename}`);
  }

  extractContentToString(buffer: Buffer): string {
    return buffer.toString();
  }

  parseCsvContent(content: string) {
    const parsedCsv = parse(content, {
      header: true,
    });
    return parsedCsv.data;
  }
}

export const editFileName = (req: any, file: any, callback: any) => {
  callback(null, file.originalname);
};
