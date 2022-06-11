import { Route } from 'react-router-dom';

import { AdminRoutePaths } from '@utils/enums';

import { Author } from './Author';
import { AuthorForm } from './AuthorForm';
import { Authors } from './Authors';
import { Book } from './Book';
import { BookForm } from './BookForm';
import { Books } from './Books';
import { Collection } from './Collection';
import { CollectionForm } from './CollectionForm';
import { Collections } from './Collections';
import { Genres } from './Genres';
import { GenreForm } from './GenreForm';
import { Dashboard } from './Dashboard';
import { Users } from './Users';
import { User } from './User';

export const Admin = () =>
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
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.USERS}`} component={Users} exact/>
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.USER}/:id`} component={User}/>
  </>
