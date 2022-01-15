import TextField from '@mui/material/TextField';
import * as React from 'react';

import Logo from '../../../logo';
import './header.scss';

export function Header() {
  return (
    <header className='header'>
      <Logo/>
      <TextField label='Search'/>
    </header>
  )
}
