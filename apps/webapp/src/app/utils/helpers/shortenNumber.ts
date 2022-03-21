import { NUMBER_GROUPING_MAP } from '@utils/constants';

export const shortenNumber = (numberToTransform: number): string | number | null => {
  if (isNaN(numberToTransform) || numberToTransform === null) {
    return null;
  }

  if (numberToTransform === 0) {
    return 0;
  }

  let absoluteValue = Math.abs(numberToTransform);
  let key = '';

  const isNegative = numberToTransform < 0;

  for (const [numberKey, numberValue] of NUMBER_GROUPING_MAP) {
    const calculatedValue = absoluteValue / numberValue;

    if (calculatedValue >= 1) {
      absoluteValue = Math.round(calculatedValue);
      key = numberKey;
      break;
    }
  }

  return (isNegative ? '-' : '') + absoluteValue + key;
}
