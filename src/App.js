import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { AdminRoute, PrivateRoute } from '@components'
import * as View from '@views'

function App() {
  return (
    <View.Base>
      <BrowserRouter>
        <Switch>
            {/* Public Routes */}
            <Route path="/" exact={true} component={View.IndexPage} />
            <Route path="/login" exact={true} component={View.LoginPage} />
            <Route path="/signup" exact={true} component={View.SignupPage} />
            <Route path="/recuperar-password" exact={true} component={View.ForgotPasswordPage} />
            <Route path="/alterar-password" exact={true} component={View.ResetPasswordPage} />
            
            {/* Private - Client Routes */}
            <PrivateRoute path="/perfil" exact={true} component={View.ProfilePage} />
            <PrivateRoute path="/encomendas" exact={true} component={View.OrdersPage} />
            <PrivateRoute path="/prova/:id" exact={true} component={View.AlbumPage} />
            <PrivateRoute path="/carrinho" exact={true} component={View.CartPage} />
            <PrivateRoute path="/resumo-carrinho" exact={true} component={View.CartSummaryPage} />
            <PrivateRoute path="/encomenda-finalizada" exact={true} component={View.CartCompletedPage} />
            
            {/* Private - Admin Routes */}
            <AdminRoute path="/administracao" exact={true} component={View.AdminPage} />
        </Switch>
      </BrowserRouter>
    </View.Base>
  );
}

export { App };
