import * as React from 'react';

import Logo from '@shared/components/logo';
import SearchInput from '@shared/components/search-input';

import './header.scss';

export function Header() {
  return (
    <header className='header'>
      <Logo/>
      <SearchInput/>
    </header>
  )
}
