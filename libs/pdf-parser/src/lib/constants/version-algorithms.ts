import { PdfVersions } from '../enums';

export const VERSION_ALGORITHMS = {
  [PdfVersions.ONE_ONE]: 'rc4',
  [PdfVersions.ONE_TWO]: 'rc4',
  [PdfVersions.ONE_THREE]: 'rc4',
  [PdfVersions.ONE_FOUR]: 'rc4',
  [PdfVersions.ONE_FIVE]: 'rc4',
  [PdfVersions.ONE_SIX]: 'aes-cbc',
  [PdfVersions.ONE_SEVEN]: 'aes-cbc',
}
