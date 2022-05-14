import { FormikProps } from 'formik/dist/types';

export interface IProps {
  form: FormikProps<any>;
  imageUrlFieldName: string;
  imageFileFieldName: string;
  styles?: Object;
}
