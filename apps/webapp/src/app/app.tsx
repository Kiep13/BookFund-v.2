import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';
import * as React from 'react';

import { AlertsBlock } from '@components/AlertsBlock';
import { Router } from '@components/Router';
import { PrivateRoute, ProtectedRoute, PublicRoute } from '@components/routes';
import { Authorizing, Login } from '@pages/auth';
import { Admin } from '@pages/admin';
import { Author, Book, Collection, Genre, Home, NotFound, Search } from '@pages/base';
import { Article, ArticleForm, Articles, Favorites, Folder, FolderForm, Reading } from '@pages/user';
import { AdminRoutePaths, AuthRoutePaths, BaseRoutePaths } from '@utils/enums';
import store from '@store/index';

const App = () =>
  <Provider store={store}>
    <CssBaseline/>
    <AlertsBlock/>
    <Router>
      <Routes>
        <Route path={BaseRoutePaths.HOME} element={
          <PublicRoute>
            <Home/>
          </PublicRoute>
        }/>
        <Route path={`${BaseRoutePaths.AUTHOR}/:id`} element={
          <PublicRoute>
            <Author/>
          </PublicRoute>
        }/>
        <Route path={`${BaseRoutePaths.BOOK}/:id`} element={
          <PublicRoute>
            <Book/>
          </PublicRoute>
        }/>
        <Route path={`${BaseRoutePaths.COLLECTION}/:id`} element={
          <PublicRoute>
            <Collection/>
          </PublicRoute>
        }/>
        <Route path={`${BaseRoutePaths.SEARCH}/:searchTerm`} element={
          <PublicRoute>
            <Search/>
          </PublicRoute>
        }/>
        <Route path={`${BaseRoutePaths.GENRE}/:genreName`} element={
          <PublicRoute>
            <Genre/>
          </PublicRoute>
        }/>
        <Route path={BaseRoutePaths.NOT_FOUND} element={
          <PublicRoute>
            <NotFound/>
          </PublicRoute>
        }/>

        <Route path={BaseRoutePaths.FAVORITES} element={
          <ProtectedRoute>
            <Favorites/>
          </ProtectedRoute>
        }/>
        <Route path={`${BaseRoutePaths.ARTICLE_NEW}`} element={
          <ProtectedRoute>
            <ArticleForm/>
          </ProtectedRoute>
        }/>
        <Route path={`${BaseRoutePaths.ARTICLE_EDIT}/:id`} element={
          <ProtectedRoute>
            <ArticleForm/>
          </ProtectedRoute>
        }/>
        <Route path={BaseRoutePaths.ARTICLES} element={
          <ProtectedRoute>
            <Articles/>
          </ProtectedRoute>
        }/>
        <Route path={`${BaseRoutePaths.ARTICLES}${BaseRoutePaths.FOLDER_EDIT}/:id`} element={
          <ProtectedRoute>
            <FolderForm/>
          </ProtectedRoute>
        }/>
        <Route path={`${BaseRoutePaths.ARTICLES}${BaseRoutePaths.FOLDER_NEW}`} element={
          <ProtectedRoute>
            <FolderForm/>
          </ProtectedRoute>
        }/>
        <Route path={`${BaseRoutePaths.ARTICLES}${BaseRoutePaths.FOLDER}/:id`} element={
          <ProtectedRoute>
            <Folder/>
          </ProtectedRoute>
        }/>
        <Route path={`${BaseRoutePaths.ARTICLE}/:id`} element={
          <ProtectedRoute>
            <Article/>
          </ProtectedRoute>
        }/>
        <Route path={`${BaseRoutePaths.BOOK}/:id${BaseRoutePaths.READ}`} element={
          <ProtectedRoute isFullScreen={true}>
            <Reading/>
          </ProtectedRoute>
        }/>


        <Route path={AdminRoutePaths.ADMIN} element={
          <PrivateRoute>
            <Admin/>
          </PrivateRoute>
        }/>

        <Route path={`${AuthRoutePaths.REFRESH}`} element={<Authorizing/>}/>
        <Route path={`${AuthRoutePaths.AUTHORIZING}/:provider`} element={<Authorizing/>}/>
        <Route path={AuthRoutePaths.LOGIN} element={<Login/>}/>

        <Route path='*' element={<Navigate to={BaseRoutePaths.NOT_FOUND} replace/>}/>
      </Routes>
    </Router>
  </Provider>;

export default App;
