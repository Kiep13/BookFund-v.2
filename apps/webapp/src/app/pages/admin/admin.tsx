import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { wrapAdminPage } from '@components/PageWrapper';
import { getIsAdmin, getIsAuthorized } from '@store/reducers';
import { useAuthHandlers } from '@utils/hooks';
import { AdminRoutePaths } from '@utils/enums';
import { compose } from '@utils/helpers';

import { Author } from './author';
import { Authors } from './authors';
import { AuthorForm } from './authorForm';
import { Book } from './book';
import { Books } from './books';
import { BookForm } from './bookForm';
import { Collection } from './collection';
import { Collections } from './collections';
import { CollectionForm } from './collectionForm';
import { Genres } from './genres';
import { GenreForm } from './genreForm';
import { Dashboard } from './dashboard';

const Page = () => {
  const isAuthorized = useSelector(getIsAuthorized);
  const isAdmin = useSelector(getIsAdmin);

  const { handleLogOut } = useAuthHandlers();

  if(!isAuthorized || !isAdmin) {
    handleLogOut(`You don't have access to this page`);
  }

  return (
    <>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.DASHBOARD}`} component={Dashboard}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR}/:id`} component={Author}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_NEW}`} component={AuthorForm}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_EDIT}/:id`} component={AuthorForm}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHORS}`} component={Authors} exact/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOK}/:id`} component={Book}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS_NEW}`} component={BookForm}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS_EDIT}/:id`} component={BookForm}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS}`} component={Books} exact/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRE_NEW}`} component={GenreForm}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRE_EDIT}/:id`} component={GenreForm}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRES}`} component={Genres} exact/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION}/:id`} component={Collection} exact/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTIONS}`} component={Collections} exact/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION_NEW}`} component={CollectionForm}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION_EDIT}/:id`} component={CollectionForm}/>
    </>
  );
}

export const Admin = compose(
  wrapAdminPage()
)(Page);
