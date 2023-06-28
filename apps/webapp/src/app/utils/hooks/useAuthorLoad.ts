import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { useApi } from '@utils/hooks';
import { IAuthor, IFormPageParams } from '@utils/interfaces';

export const useAuthorLoad = () => {
  const params = useParams();

  const {getAuthor} = useApi();

  const { data, isLoading, isError } = useQuery<IAuthor>(['author'], () => {
    const authorId = (params as IFormPageParams).id;

    return getAuthor(authorId)
  });

  return {
    author: data,
    isLoading,
    isError
  };
};
