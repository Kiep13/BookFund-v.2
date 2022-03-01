import { NumberGroupings } from '../enums';

export const NUMBER_GROUPING_MAP = new Map<NumberGroupings, number>();

NUMBER_GROUPING_MAP.set(NumberGroupings.BILLION, Math.pow(10, 9));
NUMBER_GROUPING_MAP.set(NumberGroupings.MILLION, Math.pow(10, 6));
NUMBER_GROUPING_MAP.set(NumberGroupings.THOUSAND, 1000);
