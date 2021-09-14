import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { AdminRoute, PrivateRoute } from '@components'
import { Base, AdminPage, AlbumPage, CartPage, CartCompletedPage, CartSummaryPage, ForgotPasswordPage, ResetPasswordPage, IndexPage, LoginPage, SignupPage } from '@views'

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
            <Route path="/" exact={true} component={IndexPage} />
            <Route path="/login" exact={true} component={LoginPage} />
            <Route path="/signup" exact={true} component={SignupPage} />
            <Route path="/recuperar-password" exact={true} component={ForgotPasswordPage} />
            <Route path="/alterar-password" exact={true} component={ResetPasswordPage} />
            
            {/* Private - Client Routes */}
            <PrivateRoute path="/prova/:id" exact={true} component={AlbumPage} />
            <PrivateRoute path="/carrinho" exact={true} component={CartPage} />
            <PrivateRoute path="/resumo-carrinho" exact={true} component={CartSummaryPage} />
            <PrivateRoute path="/encomenda-finalizada" exact={true} component={CartCompletedPage} />
            <PrivateRoute path="/perfil" exact={true} component={IndexPage} />
            
            {/* Private - Admin Routes */}
            <AdminRoute path="/administracao" exact={true} component={AdminPage} />
        </Switch>
      </BrowserRouter>
    </Base>
  );
}

export { App };
