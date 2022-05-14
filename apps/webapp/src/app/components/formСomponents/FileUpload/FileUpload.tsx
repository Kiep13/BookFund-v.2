import { FileForm, FilePromo } from './components';
import { IProps } from './propsInterface';

export const FileUpload = ({form, fileNameFieldName, fileFieldName}: IProps) => {
  const {values, errors} = form;

  const clearValue = async () => {
    form.setFieldValue(fileNameFieldName, null);
    form.setFieldValue(fileFieldName, undefined);

    await form.validateForm({...form.values, [fileNameFieldName]: null});
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
