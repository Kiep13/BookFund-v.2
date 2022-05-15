import { Box } from '@mui/material';

import { STYLES_TAB_PANEL } from '../../constants';
import { IProps } from './propsInterface';

export const TabPanel = ({children, value, index}: IProps) => (
  <div role='tabpanel' hidden={value !== index}>
    {value === index && (
      <Box sx={STYLES_TAB_PANEL.tabPanel}>
        {children}
      </Box>
    )}
  </div>
)

