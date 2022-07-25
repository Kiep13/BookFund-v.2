import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Layout } from '@components/Layout';
import { getIsAuthorizeAttempted, getIsAuthorized } from '@store/reducers';
import {
  RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY,
  RELOAD_PATHNAME_STORAGE_KEY,
  RELOAD_PUBLIC_FINISHED
} from '@utils/constants';
import { AuthRoutePaths } from '@utils/enums';
import { useStorage } from '@utils/hooks';

export const PublicRoute = () => {
  const location = useLocation();
  const isAuthorized = useSelector(getIsAuthorized);
  const isAuthorizeAttempted = useSelector(getIsAuthorizeAttempted);
  const {deleteFromStorage, saveToStorage} = useStorage();

  const render = () => {
    if (isAuthorized || isAuthorizeAttempted) {
      deleteFromStorage(RELOAD_PUBLIC_FINISHED);
      return <Layout><Outlet/></Layout>;
    }

    saveToStorage(RELOAD_PATHNAME_STORAGE_KEY, location.pathname);
    saveToStorage(RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY, true);
    return <Navigate to={`${AuthRoutePaths.REFRESH}`} replace/>;
  }

  return render();
}
