import { PdfVersions } from '../enums';
import { IPdfPage } from './pdf-page.interface';

export interface IPdfInfo {
  pdfVersion: PdfVersions,
  totalPageCount: number,
  structure: IPdfPage
}
