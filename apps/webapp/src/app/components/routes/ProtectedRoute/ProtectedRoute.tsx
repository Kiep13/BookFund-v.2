import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Layout } from '@components/Layout';
import { getIsAuthorized } from '@store/reducers';
import { RELOAD_PATHNAME_STORAGE_KEY } from '@utils/constants';
import { AuthRoutePaths } from '@utils/enums';
import { useStorage } from '@utils/hooks';

export const ProtectedRoute = ({ isFullScreen = false, children, ...rest }) => {
  const isAuthorized = useSelector(getIsAuthorized);
  const { saveToStorage } = useStorage();

  const render = () => {
    if(isAuthorized) {
      return !isFullScreen ? <Layout children={children} /> : children;
    }

    saveToStorage(RELOAD_PATHNAME_STORAGE_KEY, rest['location'].pathname);
    return <Redirect to={`${AuthRoutePaths.REFRESH}`}/>;
  }

  return (
    <Route
      {...rest}
      render={render}
    />
  );
}
