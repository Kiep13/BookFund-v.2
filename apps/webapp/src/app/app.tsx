import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { AlertsBlock } from '@components/AlertsBlock';
import { PrivateRoute, ProtectedRoute, PublicRoute } from '@components/routes';
import { Authorizing, Login } from '@pages/auth';
import { Admin } from '@pages/admin';
import { Author, Book, Collection, Home, NotFound, Search } from '@pages/base';
import { Article, ArticleForm, Articles, Favorites, FolderForm, Reading } from '@pages/user';
import { AdminRoutePaths, AuthRoutePaths, BaseRoutePaths } from '@utils/enums';
import store from '@store/index';

const App = () =>
  <Provider store={store}>
    <CssBaseline/>
    <AlertsBlock/>
    <Switch>
      <PublicRoute path={BaseRoutePaths.HOME} exact>
        <Home/>
      </PublicRoute>
      <PublicRoute path={`${BaseRoutePaths.AUTHOR}/:id`}>
        <Author/>
      </PublicRoute>
      <PublicRoute path={`${BaseRoutePaths.BOOK}/:id`} exact>
        <Book/>
      </PublicRoute>
      <PublicRoute path={`${BaseRoutePaths.COLLECTION}/:id`}>
        <Collection/>
      </PublicRoute>
      <PublicRoute path={`${BaseRoutePaths.SEARCH}/:searchTerm`}>
        <Search/>
      </PublicRoute>
      <PublicRoute path={BaseRoutePaths.NOT_FOUND}>
        <NotFound/>
      </PublicRoute>

      <ProtectedRoute path={BaseRoutePaths.FAVORITES}>
        <Favorites/>
      </ProtectedRoute>
      <ProtectedRoute path={`${BaseRoutePaths.ARTICLE_NEW}`} exact>
        <ArticleForm/>
      </ProtectedRoute>
      <ProtectedRoute path={`${BaseRoutePaths.ARTICLE}/:id`} exact>
        <Article/>
      </ProtectedRoute>
      <ProtectedRoute path={BaseRoutePaths.ARTICLES} exact>
        <Articles/>
      </ProtectedRoute>
      <ProtectedRoute path={`${BaseRoutePaths.ARTICLES}${BaseRoutePaths.FOLDER_NEW}`}>
        <FolderForm/>
      </ProtectedRoute>
      <ProtectedRoute path={`${BaseRoutePaths.ARTICLES}${BaseRoutePaths.FOLDER_EDIT}/:id`}>
        <FolderForm/>
      </ProtectedRoute>
      <ProtectedRoute path={`${BaseRoutePaths.BOOK}/:id${BaseRoutePaths.READ}`} isFullScreen={true}>
        <Reading/>
      </ProtectedRoute>

      <PrivateRoute path={AdminRoutePaths.ADMIN}>
        <Admin/>
      </PrivateRoute>

      <Route path={`${AuthRoutePaths.REFRESH}`} component={Authorizing}/>
      <Route path={`${AuthRoutePaths.AUTHORIZING}/:provider`} component={Authorizing}/>
      <Route path={AuthRoutePaths.LOGIN} component={Login}/>

      <Route path='*' render={() => <Redirect to={BaseRoutePaths.NOT_FOUND}/>}/>
    </Switch>
  </Provider>

export default App;
