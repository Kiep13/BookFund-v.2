import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logout } from '@store/reducers';
import { axiosInstance as axios } from '@utils/constants';
import { AuthRoutePaths } from '@utils/enums';
import { useAlerts } from '@utils/hooks';

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
