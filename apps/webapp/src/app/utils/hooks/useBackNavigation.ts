import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getLastRoute, getPreviousRoute } from '@store/reducers';

export const useBackNavigation = (defaultPreviousRoute: string) => {
  const history = useHistory();
  const previousRoute = useSelector(getPreviousRoute);
  const lastRoute = useSelector(getLastRoute);

  const navigateBack = (comparableRoute) => {
    if(comparableRoute) {
      history.goBack();
      return;
    }

    history.push(defaultPreviousRoute);
  }

  const navigatePreviousPage = () => {
    navigateBack(previousRoute);
  }

  const navigateLastPage = () => {
    navigateBack(lastRoute);
  }

  return {
    navigatePreviousPage,
    navigateLastPage
  }
}
