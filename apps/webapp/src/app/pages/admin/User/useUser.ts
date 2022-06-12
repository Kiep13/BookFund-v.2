import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { API_TOOLTIP_ERROR, PROVIDER_LABELS } from '@utils/constants';
import { AdminRoutePaths, CardStates } from '@utils/enums';
import { IFormPageParams, IUser } from '@utils/interfaces';
import { useAlerts, useApi } from '@utils/hooks';

export const useUser = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [userId, serUserId] = useState<number>();
  const [user, serUser] = useState<IUser>();

  const history = useHistory();
  const params = useParams();

  const {getUser} = useApi();
  const {addError} = useAlerts();

  const loadUser = (): void => {
    const id = (params as IFormPageParams).id;
    serUserId(id);

    getUser(id)
      .then((response: IUser) => {
        serUser({
          ...response,
          provider: PROVIDER_LABELS[response.provider]
        });
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      });
  };

  const navigateBack = (): void => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.USERS}`);
  }


  return {
    pageState,
    userId,
    user,
    loadUser,
    navigateBack
  }
}
