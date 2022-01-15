import * as React from 'react';

import './logo.scss';

export function Logo() {
  return (
    <div className='logo'>
      <img alt='bookfund' src='../../../../assets/book.png' className='logo__image'/>
      <span>BookFund</span>
    </div>
  )
}
