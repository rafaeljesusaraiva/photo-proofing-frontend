import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { PrivateRoute } from '@components'
import { Base, IndexPage, LoginPage, SignupPage } from '@views'

const colors = {
  brand: '#181919',
  'accent-1': '#2D7ABF',
  'accent-2': '#5aa1e1',
  'accent-3': '#87bcec',
  'accent-4': '#b2d7f8',
  'neutral-1': '#F6F1E9',
  'neutral-2': '#faf8f6',
  blue: '#2D7ABF',
  green: '#2DC58B',
  red: '#E4344A',
  yellow: '#FFEB59',
};

function App() {
  return (
    <Base>
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
    </Base>
  );
}

export { App };
