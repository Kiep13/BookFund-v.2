import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Layout } from '@components/Layout';
import { getIsAuthorized } from '@store/reducers';
import {
  RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY,
  RELOAD_PATHNAME_STORAGE_KEY,
  RELOAD_PUBLIC_FINISHED
} from '@utils/constants';
import { AuthRoutePaths } from '@utils/enums';
import { useStorage } from '@utils/hooks';

export const PublicRoute = ({children, ...rest}) => {
  const isAuthorized = useSelector(getIsAuthorized);
  const {doesStorageHave, deleteFromStorage, saveToStorage} = useStorage();

  const render = () => {
    if (isAuthorized) {
      return <Layout children={children}/>;
    }

    if (doesStorageHave(RELOAD_PUBLIC_FINISHED)) {
      deleteFromStorage(RELOAD_PUBLIC_FINISHED);
      return <Layout children={children}/>;
    }

    saveToStorage(RELOAD_PATHNAME_STORAGE_KEY, rest['location'].pathname);
    saveToStorage(RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY, true);
    return <Redirect to={`${AuthRoutePaths.REFRESH}`}/>;
  }

  return (
    <Route
      {...rest}
      render={render}
    />
  );
}
