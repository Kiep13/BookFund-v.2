import { useEffect } from 'react';

import { Loading } from '@components/Loading';
import { AuthRoutePaths } from '@utils/enums';

import { useAuthorizing } from './useAuthorizing';

export const Authorizing = () => {
  const {sendRefreshRequest, sendLoginRequest} = useAuthorizing();

  useEffect(() => {
    if (location.pathname === AuthRoutePaths.REFRESH) {
      sendRefreshRequest();
    } else {
      sendLoginRequest();
    }
  }, []);

  return <Loading/>
}
