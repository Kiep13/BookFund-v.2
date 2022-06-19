import { addRoute } from '@store/reducers/routeSlice';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { AuthRoutePaths } from '@utils/enums';

import {IProps} from './propsInterface';

export const Router = ({children}: IProps) => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    let previousPath = '';

    history.listen((location) => {
      if(location.pathname !== AuthRoutePaths.REFRESH && location.pathname !== previousPath) {
        previousPath = location.pathname;
        dispatch(addRoute(location.pathname));
      }
    })
  }, [])

  return children;
};
