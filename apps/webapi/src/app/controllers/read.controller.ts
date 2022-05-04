import { Request, Response } from 'express';
import * as path from 'path';

class ReadController {
  public async getFile(request: Request, response: Response, next: Function): Response {
    try {
      // const buffer = await fs.readFile(`${path.resolve(__dirname, 'assets\\books\\test1.3.pdf')}`);
      // const pdfInfo = parse(buffer);
      //
      // return response.status(ResponseStatuses.STATUS_OK).json(pdfInfo);

      const filePath = path.join(__dirname, 'assets/books', 'test1.6.pdf');

      return response.sendFile(filePath);
    } catch (error) {
      next(error)
    }
  }
}

export const readController = new ReadController();
