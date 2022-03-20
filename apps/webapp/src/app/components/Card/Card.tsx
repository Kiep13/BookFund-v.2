import { Paper } from '@mui/material';

import { STYLES } from './constants';

export const Card = (props: any) => {
  const styles = props.styles;

  return (
    <Paper elevation={3} sx={{
      ...STYLES.wrapper,
      ...(styles ? styles : {})
    }}>
      {props.children}
    </Paper>
  );
}
