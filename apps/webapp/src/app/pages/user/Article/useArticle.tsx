import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import { API_TOOLTIP_ERROR, DELETE_CARD_ACTION, EDIT_CARD_ACTION } from '@utils/constants';
import { BaseRoutePaths, CardActions, CardStates } from '@utils/enums';
import { useAlerts, useApi, useArticleActions } from '@utils/hooks';
import { IArticle, IFormPageParams } from '@utils/interfaces';

import { SUCCESSFULLY_DELETED } from './constants';

export const useArticle = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [article, setArticle] = useState<IArticle>();
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const navigate = useNavigate();
  const params = useParams();

  const {getArticle} = useApi();
  const {addSuccess, addError} = useAlerts();
  const {navigateToEditForm, handleArticleDelete} = useArticleActions();

  const headerActions = [EDIT_CARD_ACTION, DELETE_CARD_ACTION];

  const initPage = (): void => {
    const articleId = (params as IFormPageParams).id;

    getArticle(articleId)
      .then((response) => {
        setArticle(response);

        if(response.isRedirecting) {
          window.location.href = response.exactUrl;
          return;
        }

        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      })
  }

  const createMarkup = () => {
    return {
      __html: article?.content || ''
    }
  }

  const navigateBack = (): void => {
    article && navigate(`${BaseRoutePaths.ARTICLES}${BaseRoutePaths.FOLDER}/${article.folder.id}`);
  }

  const openModal = (): void => {
    setIsModalOpened(true);
  }

  const closeModal = (): void => {
    setIsModalOpened(false);
  }

  const handleSuccessArticleDeleting = (): void => {
    if(!article) return;

    addSuccess(SUCCESSFULLY_DELETED);
    navigate(`${BaseRoutePaths.ARTICLES}${BaseRoutePaths.FOLDER}/${article.folder.id}`);
  }

  const handleDeleteArticleConfirm = (): void => {
    if(!article) return;

    handleArticleDelete(article.id, handleSuccessArticleDeleting);
    setIsModalOpened(false);
  }

  const handleHeaderActionClick = (actionType: CardActions) => {
    switch(actionType) {
      case CardActions.EDIT: article && navigateToEditForm(article.id); break;
      case CardActions.DELETE: openModal();break;
    }
  }

  return {
    article,
    pageState,
    isModalOpened,
    headerActions,
    initPage,
    navigateBack,
    createMarkup,
    handleHeaderActionClick,
    handleDeleteArticleConfirm,
    closeModal
  }
}
