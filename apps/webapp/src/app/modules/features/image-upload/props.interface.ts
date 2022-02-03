import { FormikProps } from 'formik/dist/types';

export interface IProps {
  alt: string,
  form: FormikProps<any>,
  imageUrlFieldName: string,
  imageFileFieldName: string,
  styles?: Object
}
