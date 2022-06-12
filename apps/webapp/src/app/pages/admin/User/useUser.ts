import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { getUser as getAuthorizedUser } from '@store/reducers';
import { API_TOOLTIP_ERROR, PROVIDER_LABELS } from '@utils/constants';
import { AdminRoutePaths, CardStates, Roles } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';
import { IFormPageParams, IRoleChanges, IUser } from '@utils/interfaces';

import { SUCCESSFULLY_UPDATED_USER_RIGHTS } from './constants';

export const useUser = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [userId, serUserId] = useState<number>();
  const [user, serUser] = useState<IUser>();

  const history = useHistory();
  const params = useParams();

  const {getUser, updateUser} = useApi();
  const {addSuccess,addError} = useAlerts();

  const authorizedUser = useSelector(getAuthorizedUser);

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

  const isRoleActionsShown = (): boolean => {
    return Boolean(
      user &&
      authorizedUser?.id !== userId &&
      authorizedUser?.role === Roles.Admin &&
      user.role !== Roles.Admin
    );
  }

  const handleRoleUpdate = (): void => {
    if(!isRoleActionsShown()) {
      return;
    }

    const roleChanges: IRoleChanges = {
      role: user?.role === Roles.User ? Roles.Moderator : Roles.User
    }

    setPageState(CardStates.LOADING);
    userId && updateUser(userId, roleChanges)
      .then(() => {
        user && serUser({
          ...user,
          ...roleChanges
        });
        setPageState(CardStates.CONTENT);
        addSuccess(SUCCESSFULLY_UPDATED_USER_RIGHTS);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      });
  }

  return {
    pageState,
    userId,
    user,
    isRoleActionsShown,
    loadUser,
    navigateBack,
    handleRoleUpdate
  }
}
