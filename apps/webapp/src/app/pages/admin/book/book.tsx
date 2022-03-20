import { Box, Chip, Typography } from '@mui/material';
import { Image } from 'mui-image';
import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { Card } from '@components/Card';
import { EntityPageHeader } from '@components/entityPageHeader';
import { State, StatefulCard } from '@components/statefulCard';
import { API_TOOLTIP_ERROR, DELETE_BOOK_CONFIRMATION_POPUP } from '@utils/constants';
import { AdminRoutePaths } from '@utils/enums';
import { IBook, IFormPageParams, IGenre } from '@utils/interfaces';
import { useAlerts, useApi, useBookActions } from '@utils/hooks';

import { IMAGE_PROPERTIES, PAGE_TITLE, SUCCESSFULLY_DELETED, STYLES } from './constants';

export const Book = () => {
  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [book, setBook] = useState<IBook>();

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const history = useHistory();
  const params = useParams();

  const api = useApi();
  const alerts = useAlerts();
  const bookActions = useBookActions();

  const navigateToEditPage = () => {
    book && bookActions.navigateToEditForm(book?.id);
  }

  const handleConfirmDeletion = (): void => {
    book && bookActions.deleteBook(book.id, () => {
      alerts.addSuccess(SUCCESSFULLY_DELETED);
      bookActions.navigateToBooksPage();
    });

    setIsModalOpened(false);
  }

  const loadBook = (): void => {
    const bookId = (params as IFormPageParams).id;

    api.getBook(bookId)
      .then((response: IBook) => {
        setBook(response);
        setPageState(State.CONTENT);
      })
      .catch(() => {
        alerts.addError(API_TOOLTIP_ERROR);
        setPageState(State.ERROR);
      })
  }

  useEffect(() => {
    loadBook();
  }, []);

  return (
    <>
      <EntityPageHeader
        title={PAGE_TITLE}
        handleBackClick={() => history.goBack()}
        handleEditClick={navigateToEditPage}
        handleDeleteClick={() => setIsModalOpened(true)}/>

      <Card>
        <Box sx={STYLES.page}>
          <StatefulCard state={pageState}>
            <Box sx={STYLES.content}>
              <Image
                src={book?.image || ''}
                width={IMAGE_PROPERTIES.width}
                height={IMAGE_PROPERTIES.height}
                fit={IMAGE_PROPERTIES.fit}
                errorIcon={IMAGE_PROPERTIES.errorIcon}
                bgColor={IMAGE_PROPERTIES.backgroundColor}
                sx={STYLES.image}/>

              <Box sx={STYLES.info}>
                <Typography variant='h3' gutterBottom component='div'>
                  { book?.title || '' }
                </Typography>

                <Box sx={STYLES.descriptionBlock}>
                  <Box>
                    <Typography variant='body2' sx={STYLES.attributeLabel}>Author: </Typography>
                    <Typography variant='body2' sx={STYLES.attributeValue}>
                      <Link to={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR}/${book?.author?.id}`}
                            style={STYLES.link}>
                        { book?.author?.name } {book?.author?.surname}
                      </Link>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant='body2' sx={STYLES.attributeLabel}>Year: </Typography>
                    <Typography variant='body2' sx={STYLES.attributeValue}>{ book?.year }</Typography>
                  </Box>
                  <Box>
                    <Typography variant='body2' sx={STYLES.attributeLabel}>Amount of pages: </Typography>
                    <Typography variant='body2' sx={STYLES.attributeValue}>{ book?.amountPages }</Typography>
                  </Box>
                </Box>

                {
                  book?.genres?.map((genre: IGenre) => {
                    return <Chip label={genre.name}
                                 key={genre.id}
                                 color='primary'
                                 variant='outlined'
                                 sx={STYLES.chip}/>
                  })
                }

                {
                  book?.description?.split('\n').map((text: string, index: number) => {
                    return <p key={`paragraph_${index}`}>{text}</p>
                  })
                }
              </Box>
            </Box>
          </StatefulCard>
        </Box>
      </Card>

      <ConfirmationPopup
        info={DELETE_BOOK_CONFIRMATION_POPUP}
        isOpened={isModalOpened}
        handleConfirm={() => handleConfirmDeletion()}
        handleClose={() => setIsModalOpened(false)}
      />
    </>
  )
}
