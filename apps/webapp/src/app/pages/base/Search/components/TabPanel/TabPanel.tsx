import { Box, Typography } from '@mui/material';

import { IProps } from './propsInterface';

export const TabPanel = ({ children, value, index}: IProps) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
