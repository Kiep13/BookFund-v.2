import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Layout } from '@components/Layout';
import { getIsAuthorized } from '@store/reducers';
import { RELOAD_PATHNAME_STORAGE_KEY } from '@utils/constants';
import { AuthRoutePaths } from '@utils/enums';
import { useStorage } from '@utils/hooks';

export const ProtectedRoute = ({isFullScreen = false, children, ...rest}) => {
  const isAuthorized = useSelector(getIsAuthorized);
  const {saveToStorage} = useStorage();

  const render = () => {
    if (isAuthorized) {
      return !isFullScreen ? <Layout children={children}/> : children;
    }

    saveToStorage(RELOAD_PATHNAME_STORAGE_KEY, window.location.href);
    return <Navigate to={`${AuthRoutePaths.REFRESH}`} replace/>;
  }

  return render();
}
