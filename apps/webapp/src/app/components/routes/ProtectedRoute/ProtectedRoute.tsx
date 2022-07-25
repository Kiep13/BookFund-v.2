import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Layout } from '@components/Layout';
import { getIsAuthorized } from '@store/reducers';
import { RELOAD_PATHNAME_STORAGE_KEY } from '@utils/constants';
import { AuthRoutePaths } from '@utils/enums';
import { useStorage } from '@utils/hooks';

export const ProtectedRoute = ({isFullScreen = false}) => {
  const location = useLocation();
  const isAuthorized = useSelector(getIsAuthorized);
  const {saveToStorage} = useStorage();

  const render = () => {
    if (isAuthorized) {
      return !isFullScreen ? <Layout><Outlet/></Layout> : <Outlet/>;
    }

    saveToStorage(RELOAD_PATHNAME_STORAGE_KEY, location.pathname);
    return <Navigate to={`${AuthRoutePaths.REFRESH}`} replace/>;
  }

  return render();
}
