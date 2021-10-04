import React from 'react';
import { Switch, Route } from "react-router-dom";

// Components
import BookmarkApp from './components/BookmarkApp';
import BookmarkForm from './components/forms/BookmarkForm';
import FrontPage from './components/FrontPage';

// Hooks
import DataContextProvider from './components/contexts/DataContext';
import FilterContextProvider from './components/contexts/FilterContext';
import UserContextProvider from './components/contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  
  return (
    <div className="App">
      <Switch>
        <DataContextProvider>
        <UserContextProvider>  
          <Route exact path="/" component={FrontPage} />
        <FilterContextProvider>
          <ProtectedRoute exact path="/app" Component={BookmarkApp} />
        </FilterContextProvider>
          <ProtectedRoute exact path="/create" Component={BookmarkForm} />
          <ProtectedRoute exact path="/edit/:id" Component={BookmarkForm} />
        </UserContextProvider>    
        </DataContextProvider>
      </Switch>
    </div>
  );
}

export default App;
