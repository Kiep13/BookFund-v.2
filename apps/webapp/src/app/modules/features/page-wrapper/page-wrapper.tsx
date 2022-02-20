import { Box, CssBaseline  }from '@mui/material';

import { Header } from './components/header';
import { Sidenav } from './components/sidenav';
import { STYLES_PAGE_WRAPPER } from './constants';
import './page-wrapper.scss';

export const PageWrapper = (props: any) => {
  return (
    <section className='page-wrapper'>
      <CssBaseline/>
      <Sidenav menuItems={props.menuItems}/>
      <Box component="main" sx={STYLES_PAGE_WRAPPER.box}>
        <div className='page-wrapper__header'>
          <Header/>
        </div>
        {props.children}
      </Box>
    </section>
  );
}
