import { TextField } from '@mui/material';

import { IProps } from './propsInterface';

export const Input = ({id, name, label, type, fieldName, form, styles, multiline, maxRows }: IProps) => {
  const {values, errors, touched, handleChange, handleBlur} = form;

  return <TextField
            id={id}
            name={name}
            label={label}
            type={type || 'text'}
            multiline={multiline}
            maxRows={maxRows}
            error={Boolean(errors[fieldName] && touched[fieldName])}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[fieldName]}
            helperText={errors[fieldName] && touched[fieldName] && errors[fieldName]}
            sx={styles}/>
}

