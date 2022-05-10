import { FormikProps } from 'formik/dist/types';

export interface IProps {
  form: FormikProps<any>,
  fileNameFieldName,
  fileFieldName: string,
}
