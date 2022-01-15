import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Header from './components/header';
import Sidenav from './components/sidenav';
import './page-wrapper.scss';

export function PageWrapper(props: any) {
  return (
    <section className='page-wrapper'>
      <CssBaseline/>
      <Sidenav menuItems={props.menuItems}/>
      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <Header/>
        {props.children}
      </Box>
    </section>
  )
}
