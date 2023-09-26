import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'; 
import Header from './Header'; 

function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component="" /> 
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;

