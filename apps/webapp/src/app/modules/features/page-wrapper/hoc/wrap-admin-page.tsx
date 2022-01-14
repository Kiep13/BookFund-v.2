import { Component } from 'react';

import { ADMIN_MENU_ITEMS } from '../constants';
import { PageWrapper } from '../page-wrapper';

export function wrapAdminPage() {
  return (WrappedPage: typeof Component) => {
    return (props: any) => (
      <PageWrapper menuItems={ADMIN_MENU_ITEMS}>
        <WrappedPage {...props}/>)
      </PageWrapper>
    )
  }
}
