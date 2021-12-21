import React from 'react';
import {Route, Switch} from 'react-router-dom';

import HomePage from "./components/homepage";
import AuthorizationPage from "./components/authorization";
import Registration from './components/registration';
import GenresPage from "./components/genres-page";
import AuthorsPage from "./components/authors-page";
import PublishersPage from "./components/publishers-page";
import LibrariesPage from "./components/libraries-page";
import BooksPage from "./components/books-page";
import BookFundPage from "./components/bookfund-page";
import ErrorIndicator from "./components/error-indicator";

const App = () => {
  return (
    <Switch>
      <Route path='/' component={HomePage} exact/>
      <Route path='/authorization' component={AuthorizationPage}/>
      <Route path='/registration' component={Registration}/>
      <Route path='/genres' component={GenresPage}/>
      <Route path='/authors' component={AuthorsPage}/>
      <Route path='/publishers' component={PublishersPage}/>
      <Route path='/libraries' component={LibrariesPage}/>
      <Route path='/books' component={BooksPage}/>
      <Route path='/book-fund' component={BookFundPage}/>
      <Route path='/error' component={ErrorIndicator}/>
    </Switch>
  )
};

export default App;
