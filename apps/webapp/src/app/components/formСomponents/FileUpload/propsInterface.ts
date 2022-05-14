import { FormikProps } from 'formik/dist/types';

export interface IProps {
  form: FormikProps<any>;
  fileNameFieldName: string;
  fileFieldName: string;
  styles?: Object;
}
