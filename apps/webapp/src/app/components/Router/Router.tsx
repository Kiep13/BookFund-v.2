import { addRoute } from '@store/reducers/routeSlice';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { AuthRoutePaths } from '@utils/enums';

import { IProps } from './propsInterface';

export const Router = ({children}: IProps) => {
  const location = useLocation();
  const dispatch = useDispatch();

  let previousPath = '';

  useEffect(() => {

    if (location.pathname !== AuthRoutePaths.REFRESH && location.pathname !== previousPath) {
      previousPath = location.pathname;
      dispatch(addRoute(location.pathname));
    }
  }, [location]);

  return children;
};
