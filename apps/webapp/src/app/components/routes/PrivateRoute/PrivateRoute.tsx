import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {Layout} from '@components/Layout';
import {getIsAdmin, getIsAuthorized} from '@store/reducers';
import {RELOAD_PATHNAME_STORAGE_KEY} from '@utils/constants';
import {AuthRoutePaths} from '@utils/enums';
import {useAuthHandlers, useStorage} from '@utils/hooks';

export const PrivateRoute = () => {
  const location = useLocation();
  const isAuthorized = useSelector(getIsAuthorized);
  const isAdmin = useSelector(getIsAdmin);

  const {saveToStorage} = useStorage();
  const {handleLogOut} = useAuthHandlers();

  if (!isAuthorized) {
    saveToStorage(RELOAD_PATHNAME_STORAGE_KEY, location.pathname);
    return <Navigate to={`${AuthRoutePaths.REFRESH}`} replace/>;
  }

  if (!isAdmin) {
    saveToStorage(RELOAD_PATHNAME_STORAGE_KEY, location.pathname);
    handleLogOut(`You don't have access to this page`);
    return <Navigate to={`${AuthRoutePaths.LOGIN}`} replace/>;
  }

  return <Layout><Outlet/></Layout>;
}
