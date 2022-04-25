import { PdfVersions } from '../enums';

export const VERSION_DECRYPTION_KEY_LENGTH = {
  [PdfVersions.ONE_ONE]: 40,
  [PdfVersions.ONE_TWO]: 40,
  [PdfVersions.ONE_THREE]: 40,
  [PdfVersions.ONE_FOUR]: 128,
  [PdfVersions.ONE_FIVE]: 128,
  [PdfVersions.ONE_SIX]: 128,
  [PdfVersions.ONE_SEVEN]: 128,
}
