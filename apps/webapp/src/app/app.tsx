import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';
import * as React from 'react';

import { AlertsBlock } from '@components/AlertsBlock';
import { Router } from '@components/Router';
import { PrivateRoute, ProtectedRoute, PublicRoute } from '@components/routes';
import { Authorizing, Login } from '@pages/auth';
import * as Admin from '@pages/admin';
import { Author, Book, Collection, Genre, Home, NotFound, Search } from '@pages/base';
import { Article, ArticleForm, Articles, Favorites, Folder, FolderForm, Reading } from '@pages/user';
import { AdminRoutePaths, AuthRoutePaths, BaseRoutePaths } from '@utils/enums';
import store from '@store/index';

const App = () =>
  <Provider store={store}>
    <CssBaseline/>
    <Router/>
    <AlertsBlock/>
    <Routes>
      <Route element={<PublicRoute/>}>
        <Route path={BaseRoutePaths.HOME} element={<Home/>}/>
        <Route path={`${BaseRoutePaths.AUTHOR}/:id`} element={<Author/>}/>
        <Route path={`${BaseRoutePaths.BOOK}/:id`} element={<Book/>}/>
        <Route path={`${BaseRoutePaths.COLLECTION}/:id`} element={<Collection/>}/>
        <Route path={`${BaseRoutePaths.SEARCH}/:searchTerm`} element={<Search/>}/>
        <Route path={`${BaseRoutePaths.GENRE}/:genreName`} element={<Genre/>}/>
        <Route path={BaseRoutePaths.NOT_FOUND} element={<NotFound/>}/>
      </Route>

      <Route element={<ProtectedRoute/>}>
        <Route path={BaseRoutePaths.FAVORITES} element={<Favorites/>}/>
        <Route path={`${BaseRoutePaths.ARTICLE_NEW}`} element={<ArticleForm/>}/>
        <Route path={`${BaseRoutePaths.ARTICLE_EDIT}/:id`} element={<ArticleForm/>}/>
        <Route path={BaseRoutePaths.ARTICLES} element={<Articles/>}/>
        <Route path={`${BaseRoutePaths.ARTICLES}${BaseRoutePaths.FOLDER_EDIT}/:id`} element={<FolderForm/>}/>
        <Route path={`${BaseRoutePaths.ARTICLES}${BaseRoutePaths.FOLDER_NEW}`} element={<FolderForm/>}/>
        <Route path={`${BaseRoutePaths.ARTICLES}${BaseRoutePaths.FOLDER}/:id`} element={<Folder/>}/>
        <Route path={`${BaseRoutePaths.ARTICLE}/:id`} element={<Article/>}/>
        <Route path={`${BaseRoutePaths.BOOK}/:id${BaseRoutePaths.READ}`} element={<Reading/>}/>
      </Route>

      <Route path={AdminRoutePaths.ADMIN} element={<PrivateRoute/>}>
        <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.DASHBOARD}`} element={<Admin.Dashboard/>}/>
        <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR}/:id`} element={<Admin.Author/>}/>
        <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_NEW}`} element={<Admin.AuthorForm/>}/>
        <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_EDIT}/:id`} element={<Admin.AuthorForm/>}/>
        <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHORS}`} element={<Admin.Authors/>}/>
        <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOK}/:id`} element={<Admin.Book/>}/>
        <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS_NEW}`} element={<Admin.BookForm/>}/>
        <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS_EDIT}/:id`} element={<Admin.BookForm/>}/>
        <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS}`} element={<Admin.Books/>}/>
        <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRE_NEW}`} element={<Admin.GenreForm/>}/>
        <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRE_EDIT}/:id`} element={<Admin.GenreForm/>}/>
        <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRES}`} element={<Admin.Genres/>}/>
        <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION}/:id`} element={<Admin.Collection/>}/>
        <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTIONS}`} element={<Admin.Collections/>}/>
        <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION_NEW}`} element={<Admin.CollectionForm/>}/>
        <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION_EDIT}/:id`}
               element={<Admin.CollectionForm/>}/>
        <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.USERS}`} element={<Admin.Users/>}/>
        <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.USER}/:id`} element={<Admin.User/>}/>
      </Route>

      <Route path={`${AuthRoutePaths.REFRESH}`} element={<Authorizing/>}/>
      <Route path={`${AuthRoutePaths.AUTHORIZING}/:provider`} element={<Authorizing/>}/>
      <Route path={AuthRoutePaths.LOGIN} element={<Login/>}/>

      <Route path='*' element={<Navigate to={BaseRoutePaths.NOT_FOUND} replace/>}/>
    </Routes>
  </Provider>;

export default App;
