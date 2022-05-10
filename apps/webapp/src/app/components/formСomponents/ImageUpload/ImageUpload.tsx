import { ImageForm } from './components/ImageForm';
import { ImagePromo } from './components/ImagePromo';
import { IProps } from './propsInterface';

export const ImageUpload = ({form, imageUrlFieldName, imageFileFieldName}: IProps) => {
  const {values, errors} = form;

  const clearValue = () => {
    form.setFieldValue(imageUrlFieldName, '');
    form.setFieldValue(imageFileFieldName, undefined);
  }

  const isPromoAvailable = (Boolean(values[imageUrlFieldName]) && !Boolean(errors[imageUrlFieldName]))
                            || (Boolean(values[imageFileFieldName]) && !Boolean(errors[imageFileFieldName]));

  return (
    isPromoAvailable ?
      <ImagePromo image={values[imageUrlFieldName] || URL.createObjectURL(values[imageFileFieldName])}
                  clearImage={clearValue}/>
      : <ImageForm form={form} imageUrlFieldName={imageUrlFieldName} imageFileFieldName={imageFileFieldName}/>
  );
}
