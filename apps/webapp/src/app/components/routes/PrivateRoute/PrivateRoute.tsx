import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Layout } from '@components/Layout';
import { getIsAdmin, getIsAuthorized } from '@store/reducers';
import { RELOAD_PATHNAME_STORAGE_KEY } from '@utils/constants';
import { AuthRoutePaths } from '@utils/enums';
import { useAuthHandlers, useStorage } from '@utils/hooks';

export const PrivateRoute = ({children, ...rest}) => {
  const isAuthorized = useSelector(getIsAuthorized);
  const isAdmin = useSelector(getIsAdmin);

  const {saveToStorage} = useStorage();
  const {handleLogOut} = useAuthHandlers();

  const render = () => {
    if (!isAuthorized) {
      saveToStorage(RELOAD_PATHNAME_STORAGE_KEY, rest['location'].pathname);
      return <Redirect to={`${AuthRoutePaths.REFRESH}`}/>;
    }

    if (!isAdmin) {
      saveToStorage(RELOAD_PATHNAME_STORAGE_KEY, rest['location'].pathname);
      handleLogOut(`You don't have access to this page`);
      return <Redirect to={`${AuthRoutePaths.LOGIN}`}/>;
    }

    return <Layout children={children}/>;
  }

  return (
    <Route
      {...rest}
      render={render}
    />
  );
}
