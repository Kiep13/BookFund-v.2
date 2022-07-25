import { useSelector } from 'react-redux';
import { useNavigate  } from 'react-router-dom';

import { getLastRoute, getPreviousRoute } from '@store/reducers';

export const useBackNavigation = (defaultPreviousRoute: string) => {
  const navigate = useNavigate ();
  const previousRoute = useSelector(getPreviousRoute);
  const lastRoute = useSelector(getLastRoute);

  const navigateBack = (comparableRoute) => {
    if(comparableRoute) {
      navigate(comparableRoute);
      return;
    }

    navigate(defaultPreviousRoute);
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
