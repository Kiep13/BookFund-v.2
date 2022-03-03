import { TextField } from '@mui/material';

import { IProps } from './props.interface';

export const Input = (props: IProps) => {
  const {id, name, label, type, fieldName, styles, multiline, maxRows } = props;
  const {values, errors, touched, handleChange, handleBlur} = props.form;

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

