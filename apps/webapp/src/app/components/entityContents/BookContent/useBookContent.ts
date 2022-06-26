import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { BaseRoutePaths } from '@utils/enums';
import { useBookActions, useCommentList } from '@utils/hooks';
import { IBook, IComment, IFavorite, IGenre } from '@utils/interfaces';

export const useBookContent = (
  book: IBook | undefined,
  handleBookChange: Function | undefined) => {
  const [isCommentSaved, setIsCommentSaved] = useState<boolean>(!book?.isCommented && true);

  const {
    comments,
    count,
    loadingComments,
    addCreatedComment,
    loadComments,
    loadNextPage
  } = useCommentList();
  const {navigateToReadingPage} = useBookActions();
  const history = useHistory();

  const handleReadClick = (): void => {
    book && navigateToReadingPage(book.id);
  }

  const handleCommentSave = (comment: IComment): void => {
    setIsCommentSaved(false);

    if(book) {
      const { avgRate = 0, ratesAmount = 0} = book;
      const newRate  = ((avgRate * ratesAmount) + comment.rate) / (ratesAmount + 1);

      handleBookChange && handleBookChange({
        ...book,
        avgRate: newRate,
        ratesAmount: ratesAmount + 1
      });
    }

    if(comment.text) {
      addCreatedComment(comment);
    }
  }

  const handleAddToFavorite = (favorite: IFavorite): void => {
    handleBookChange && handleBookChange({
      ...book,
      favorite: favorite
    });
  }

  const handleRemovedFromFavorite = (): void => {
    delete book?.favorite;

    handleBookChange && handleBookChange({
      ...book
    });
  }

  const navigateToGenrePage = (genre: IGenre) => {
    history.push(`${BaseRoutePaths.GENRE}/${genre.name}`);
  }

  return {
    comments,
    count,
    loadingComments,
    isCommentSaved,
    loadComments,
    loadNextPage,
    handleReadClick,
    handleAddToFavorite,
    handleRemovedFromFavorite,
    handleCommentSave,
    navigateToGenrePage
  }
}
