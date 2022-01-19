import { Paper } from "@mui/material";
import Box from '@mui/material/Box';

import './card.scss';

export default function Card(props: any) {
  return (
    <Paper elevation={3} sx={{
      borderRadius: 2,
    }}>
      <Box sx={{
        p: 2,
      }}>
        { props.children }
      </Box>
    </Paper>

  );
}
