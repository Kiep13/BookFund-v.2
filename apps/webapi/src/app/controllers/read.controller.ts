import { Request, Response } from 'express';
import * as path from 'path';
import * as fs from 'fs/promises';

import { parse } from '@pdf-parser';

import { ResponseStatuses } from '@core/enums';

class ReadController {
  public async getPages(request: Request, response: Response, next: Function): Response {
    try {
      const buffer = await fs.readFile(`${path.resolve(__dirname, 'assets\\books\\test1.7.pdf')}`);
      const pdfInfo = parse(buffer);

      return response.status(ResponseStatuses.STATUS_OK).json(pdfInfo);
    } catch (error) {
      next(error)
    }
  }
}

export const readController = new ReadController();
