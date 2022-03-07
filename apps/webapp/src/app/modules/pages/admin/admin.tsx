import { Route } from 'react-router-dom';

import { AdminRoutePaths } from '@core/enums';
import { wrapAdminPage } from '@features/pageWrapper';
import compose from '@shared/utils/compose';

import { Authors } from './authors';
import { AuthorForm } from './authorForm';
import { Books } from './books';
import { BookForm } from './bookForm';
import { Collections } from './collections';
import { CollectionForm } from './collectionForm';
import { Genres } from './genres';
import { GenreForm } from './genreForm';
import { Dashboard } from './dashboard';

const AdminPage = () => {
  return (
    <>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.DASHBOARD}`} component={Dashboard}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_NEW}`} component={AuthorForm}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_EDIT}/:id`} component={AuthorForm}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHORS}`} component={Authors} exact/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS_NEW}`} component={BookForm}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS_EDIT}/:id`} component={BookForm}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS}`} component={Books} exact/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRE_NEW}`} component={GenreForm}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRE_EDIT}/:id`} component={GenreForm}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRES}`} component={Genres} exact/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTIONS}`} component={Collections} exact/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION_NEW}`} component={CollectionForm}/>
    </>
  );
}

export const Admin = compose(
  wrapAdminPage()
)(AdminPage);
