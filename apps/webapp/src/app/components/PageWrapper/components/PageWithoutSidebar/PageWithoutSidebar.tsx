import { Box } from '@mui/material';

import { STYLES_PAGE_WRAPPER } from '../../constants';
import { Header } from '../Header';
import { IProps } from './propsInterface';

export const PageWithoutSidebar = (props: IProps) =>
  <Box sx={STYLES_PAGE_WRAPPER.pageWithoutSidebar}>
    <Box component='main' sx={STYLES_PAGE_WRAPPER.box}>
      <Box sx={STYLES_PAGE_WRAPPER.header}>
        <Header/>
      </Box>
      {props.children}
    </Box>
  </Box>
