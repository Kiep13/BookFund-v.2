import { Component } from 'react';

import { USER_MENU_ITEMS } from '../constants';
import { PageWrapper } from '../pageWrapper';

export function wrapUserPage() {
  return (WrappedPage: typeof Component) => {
    return (props: any) => (
      <PageWrapper menuItems={USER_MENU_ITEMS}>
        <WrappedPage {...props}/>
      </PageWrapper>
    )
  }
}
