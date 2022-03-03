import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { Card } from '@shared/components/card';

import { STYLES } from './constants';
import { IProps } from './props.interface';

export const PageHeaderCard = ({ title, url }: IProps) => {
  return (
    <Card>
      <Box sx={STYLES.wrapper}>
        <Typography
          variant='h5'
          gutterBottom
          component='div'
          sx={STYLES.title}>
          { title }
        </Typography>
        <Link to={url}>
          <Button variant='contained'>Add new</Button>
        </Link>
      </Box>
    </Card>
  )
}
