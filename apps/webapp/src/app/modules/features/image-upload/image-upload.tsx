import * as React from 'react';

import ImageForm from './image-form';
import ImagePromo from './image-promo';
import './image-upload.scss' ;

export default function ImageUpload(props: any) {
  const alt: string = props.alt;

  const initialState = {
    file: undefined,
    url: ''
  }

  const [file, setFile] = React.useState(initialState.file);
  const [url, setUrl] = React.useState(initialState.url);

  const handleChangeUrl = (event: any) => {
    setUrl(event.target.value);
  };

  const handleChangeFile = (event: any) => {
    setFile(event.target.files[0]);
  };

  const clearValue = () => {
    setUrl(initialState.url);
    setFile(initialState.file);
  }

  const form = <ImageForm handleChangeFile={handleChangeFile} handleChangeUrl={handleChangeUrl}/>;

  return (
    !url && !file ? form : <ImagePromo alt={alt} image={url || URL.createObjectURL(file)} clearImage={clearValue}/>
  );
}
