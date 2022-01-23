import { Paper } from '@mui/material';

import './card.scss';

export default function Card(props: any) {
  const styles = props.styles;

  return (
    <Paper elevation={3} sx={{
      borderRadius: 2,
      p: 2,
      ...(styles ? styles : {})
    }}>
      {props.children}
    </Paper>
  );
}
