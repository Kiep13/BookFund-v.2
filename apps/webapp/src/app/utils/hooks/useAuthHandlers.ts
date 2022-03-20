import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useAlerts } from '@components/alertsBlock';
import { logout } from '@store/reducers';
import { axios } from '@utils/constants';
import { AuthRoutePaths } from '@utils/enums';

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
