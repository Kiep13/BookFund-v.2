import { useSelector } from 'react-redux';

import { getIsAuthorized } from '@store/reducers';

import { PageWithSidebar, PageWithoutSidebar } from './components';
import { IProps } from './propsInterface';

export const Layout = (props: IProps) => {
  const isAuthorized = useSelector(getIsAuthorized);

  return isAuthorized ? <PageWithSidebar {...props}/> : <PageWithoutSidebar children={props.children}/>
}
