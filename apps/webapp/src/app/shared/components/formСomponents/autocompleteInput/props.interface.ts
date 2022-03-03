import { FormikProps } from 'formik/dist/types';

import { IOption } from '@core/interfaces';

export interface IProps {
  label: string,
  options: IOption[],
  loading: boolean;
  form: FormikProps<any>,
  fieldName: string,
  handleTyping: Function
}
