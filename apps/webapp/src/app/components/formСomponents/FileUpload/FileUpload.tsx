import { FileForm, FilePromo } from './components';
import { IProps } from './propsInterface';

export const FileUpload = ({form, fileNameFieldName, fileFieldName}: IProps) => {
  const {values, errors} = form;

  const clearValue = () => {
    form.setFieldValue(fileNameFieldName, '');
    form.setFieldValue(fileFieldName, undefined);
  }

  const isPromoAvailable = (Boolean(values[fileNameFieldName]) && !Boolean(errors[fileNameFieldName]))
    || (Boolean(values[fileFieldName]) && !Boolean(errors[fileFieldName]));

  return (
    isPromoAvailable ?
      <FilePromo
        fileName={values[fileNameFieldName]}
        clearImage={clearValue}
      />
      :
      <FileForm
        form={form}
        fileNameFieldName={fileNameFieldName}
        fileFieldName={fileFieldName}
      />
  )
}
