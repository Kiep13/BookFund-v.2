import { Typography } from '@mui/material';

import { STYLES_COPYRIGHT } from '../../constants';
import { IProps } from './propsInterface';

export const Copyright = (props: IProps) =>
  <Typography
    variant='body2'
    color='text.secondary'
    align='center'
    sx={{
      ...props.sx,
      ...STYLES_COPYRIGHT.text
    }}>
    {`Copyright © bookfund.com ${new Date().getFullYear()}`}
  </Typography>
