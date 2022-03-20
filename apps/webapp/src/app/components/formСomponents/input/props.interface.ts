import { FormikProps } from 'formik/dist/types';

export interface IProps {
  id: string,
  label: string,
  fieldName: string,
  form: FormikProps<any>,
  name?: string,
  maxRows?: number,
  multiline?: boolean,
  type?: string,
  styles?: Object
}
