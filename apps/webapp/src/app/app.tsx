import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { AlertsBlock } from '@components/AlertsBlock';
import { Loading } from '@components/Loading';
import { Router } from '@components/Router';
import { PrivateRoute, ProtectedRoute, PublicRoute } from '@components/routes';
import { AdminRoutePaths, AuthRoutePaths, BaseRoutePaths } from '@utils/enums';
import store from '@store/index';

const Home = lazy(() => import('./pages/base/Home'));
const Author = lazy(() => import('./pages/base/Author'));
const Book = lazy(() => import('./pages/base/Book'));
const Collection = lazy(() => import('./pages/base/Collection'));
const Search = lazy(() => import('./pages/base/Search'));
const Genre = lazy(() => import('./pages/base/Genre'));
const NotFound = lazy(() => import('./pages/base/NotFound'));

const Article = lazy(() => import('./pages/user/Article'));
const ArticleForm = lazy(() => import('./pages/user/ArticleForm'));
const Articles = lazy(() => import('./pages/user/Articles'));
const Favorites = lazy(() => import('./pages/user/Favorites'));
const Folder = lazy(() => import('./pages/user/Folder'));
const FolderForm = lazy(() => import('./pages/user/FolderForm'));
const Reading = lazy(() => import('./pages/user/Reading'));

const Authorizing = lazy(() => import('./pages/auth/Authorizing'));
const Login = lazy(() => import('./pages/auth/Login'));

const AdminAuthor = lazy(() => import('./pages/admin/Author'));
const AdminAuthorForm = lazy(() => import('./pages/admin/AuthorForm'));
const AdminAuthors= lazy(() => import('./pages/admin/Authors'));
const AdminBook = lazy(() => import('./pages/admin/Book'));
const AdminBookForm = lazy(() => import('./pages/admin/BookForm'));
const AdminBooks = lazy(() => import('./pages/admin/Books'));
const AdminCollection = lazy(() => import('./pages/admin/Collection'));
const AdminCollectionForm = lazy(() => import('./pages/admin/CollectionForm'));
const AdminCollections = lazy(() => import('./pages/admin/Collections'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminGenreForm = lazy(() => import('./pages/admin/GenreForm'));
const AdminGenres = lazy(() => import('./pages/admin/Genres'));
const AdminUsers = lazy(() => import('./pages/admin/Users'));
const AdminUser = lazy(() => import('./pages/admin/User'));

const App = () =>
  <Provider store={store}>
    <CssBaseline/>
    <Router/>
    <AlertsBlock/>
    <Suspense fallback={<Loading/>}>
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
          <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.DASHBOARD}`} element={<AdminDashboard/>}/>
          <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR}/:id`} element={<AdminAuthor/>}/>
          <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_NEW}`} element={<AdminAuthorForm/>}/>
          <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_EDIT}/:id`} element={<AdminAuthorForm/>}/>
          <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHORS}`} element={<AdminAuthors/>}/>
          <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOK}/:id`} element={<AdminBook/>}/>
          <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS_NEW}`} element={<AdminBookForm/>}/>
          <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS_EDIT}/:id`} element={<AdminBookForm/>}/>
          <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS}`} element={<AdminBooks/>}/>
          <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRE_NEW}`} element={<AdminGenreForm/>}/>
          <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRE_EDIT}/:id`} element={<AdminGenreForm/>}/>
          <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRES}`} element={<AdminGenres/>}/>
          <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION}/:id`} element={<AdminCollection/>}/>
          <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTIONS}`} element={<AdminCollections/>}/>
          <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION_NEW}`} element={<AdminCollectionForm/>}/>
          <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.COLLECTION_EDIT}/:id`}
                 element={<AdminCollectionForm/>}/>
          <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.USERS}`} element={<AdminUsers/>}/>
          <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.USER}/:id`} element={<AdminUser/>}/>
        </Route>

        <Route path={`${AuthRoutePaths.REFRESH}`} element={<Authorizing/>}/>
        <Route path={`${AuthRoutePaths.AUTHORIZING}/:provider`} element={<Authorizing/>}/>
        <Route path={AuthRoutePaths.LOGIN} element={<Login/>}/>

        <Route path='*' element={<Navigate to={BaseRoutePaths.NOT_FOUND} replace/>}/>
      </Routes>
    </Suspense>
  </Provider>;

export default App;

