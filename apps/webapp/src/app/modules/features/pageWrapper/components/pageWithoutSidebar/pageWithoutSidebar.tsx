import { Box } from '@mui/material';

import { STYLES_PAGE_WRAPPER } from '../../constants';
import { Header } from '../header';
import { IProps } from './props.interface';

export const PageWithoutSidebar = (props: IProps) => {
  return (
    <Box sx={STYLES_PAGE_WRAPPER.pageWithoutSidebar}>
      <Box component='main' sx={STYLES_PAGE_WRAPPER.box}>
        <Box sx={STYLES_PAGE_WRAPPER.header}>
          <Header/>
        </Box>
        {props.children}
      </Box>
    </Box>
  )
}
