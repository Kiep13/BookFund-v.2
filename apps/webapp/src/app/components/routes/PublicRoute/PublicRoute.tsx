import { Navigate } from 'react-router-dom';
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

export const PublicRoute = ({children, ...rest}) => {
  const isAuthorized = useSelector(getIsAuthorized);
  const IsAuthorizeAttempted = useSelector(getIsAuthorizeAttempted);
  const {deleteFromStorage, saveToStorage} = useStorage();

  const render = () => {
    if (isAuthorized || IsAuthorizeAttempted) {
      deleteFromStorage(RELOAD_PUBLIC_FINISHED);
      return <Layout children={children}/>;
    }

    saveToStorage(RELOAD_PATHNAME_STORAGE_KEY, window.location.href);
    saveToStorage(RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY, true);
    return <Navigate to={`${AuthRoutePaths.REFRESH}`} replace/>;
  }

  return render();
}
