import * as React from 'react';

import ImageForm from './components/image-form';
import ImagePromo from './components/image-promo';
import { IProps } from './props.interface';
import './image-upload.scss' ;

export default function ImageUpload(props: IProps) {
  const {alt, form, imageUrlFieldName, imageFileFieldName} = props;
  const {values, errors} = form;

  const clearValue = () => {
    form.setFieldValue(imageUrlFieldName, '');
    form.setFieldValue(imageFileFieldName, undefined);
  }

  const isPromoAvailable = (Boolean(values[imageUrlFieldName]) || Boolean(values[imageFileFieldName])) &&
    !Boolean(errors[imageFileFieldName]) && !Boolean(errors[imageUrlFieldName]);

  return (
    isPromoAvailable ?
      <ImagePromo alt={alt} image={values[imageUrlFieldName] || URL.createObjectURL(values[imageFileFieldName])}
                  clearImage={clearValue}/>
      : <ImageForm form={form} imageUrlFieldName={imageUrlFieldName} imageFileFieldName={imageFileFieldName}/>
  );
}
