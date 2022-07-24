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
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.DASHBOARD}`} element={<Dashboard/>}/>
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR}/:id`} element={<Author/>}/>
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_NEW}`} element={<AuthorForm/>}/>
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_EDIT}/:id`} element={<AuthorForm/>}/>
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHORS}`} element={<Authors/>}/>
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOK}/:id`} element={<Book/>}/>
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS_NEW}`} element={<BookForm/>}/>
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS_EDIT}/:id`} element={<BookForm/>}/>
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS}`} element={<Books/>}/>
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRE_NEW}`} element={<GenreForm/>}/>
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRE_EDIT}/:id`} element={<GenreForm/>}/>
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRES}`} element={<Genres/>}/>
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION}/:id`} element={<Collection/>}/>
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTIONS}`} element={<Collections/>}/>
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION_NEW}`} element={<CollectionForm/>}/>
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION_EDIT}/:id`} element={<CollectionForm/>}/>
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.USERS}`} element={<Users/>}/>
    <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.USER}/:id`} element={<User/>}/>
  </>
