import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { addRoute, getPreviousRoute } from '@store/reducers/routeSlice';
import { AuthRoutePaths } from '@utils/enums';

export const Router = () => {
  const previousRoute = useSelector(getPreviousRoute);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname !== AuthRoutePaths.REFRESH && location.pathname !== previousRoute) {
      dispatch(addRoute(location.pathname));
    }
  }, [location, previousRoute]);

  return <></>;
};
