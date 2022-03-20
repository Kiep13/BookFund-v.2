import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { axios } from '@core/constants';
import { AuthRoutePaths } from '@core/enums';
import { useAlerts } from '@features/alertsBlock';
import { logout } from '@store/reducers';

export const useAuthHandlers = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { addError } = useAlerts();

  const handleLogOut = (message: string = '') => {
    dispatch(logout);
    delete axios.defaults.headers.common['Authorization'];

    if(message) {
      addError(message);
    }

    history.push(AuthRoutePaths.LOGIN);
  }

  return {
    handleLogOut
  }
}
