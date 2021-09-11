import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { PrivateRoute } from '@components'
import { IndexPage, LoginPage, SignupPage } from '@views'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* Public Routes */}
        <Route path="/login" exact={true} component={LoginPage} />
        <Route path="/signup" exact={true} component={SignupPage} />

        {/* Private - Client Routes */}
        <PrivateRoute path="/" exact={true} component={IndexPage} />
        
        {/* Private - Admin Routes */}
      </Switch>
    </BrowserRouter>
  );
}

export { App };
