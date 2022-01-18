import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'

import { AdminRoute, PrivateRoute } from '@components'
import * as View from '@views'

function App() {
  return (
    <View.Base>
      <BrowserRouter>
        <Switch>
            {/* Public Routes */}
            <Route path="/" exact={true} component={View.Public.Index} />
            <Route path="/login" exact={true} component={View.Public.Login} />
            <Route path="/signup" exact={true} component={View.Public.Signup} />
            <Route path="/recuperar-password" exact={true} component={View.Public.ForgotPassword} />
            <Route path="/alterar-password" exact={true} component={View.Public.ResetPassword} />
            
            {/* Private - Client Routes */}
            <PrivateRoute path="/perfil" exact={true} component={View.Client.Profile} />
            <PrivateRoute path="/encomendas" exact={true} component={View.Client.Orders} />
            <PrivateRoute path="/prova/:id" exact={true} component={View.Client.Album} />
            <PrivateRoute path="/carrinho" exact={true} component={View.Client.Cart} />
            <PrivateRoute path="/resumo-carrinho" exact={true} component={View.Client.CartSummary} />
            <PrivateRoute path="/encomenda-finalizada" exact={true} component={View.Client.CartCompleted} />
            
            {/* Private - Admin Routes */}
            <AdminRoute path="/administracao" exact={true} component={View.AdminDashboard} />
            {/*           Admin | Client Routes */}
            <AdminRoute path="/administracao/clientes" exact={true} component={View.AdminClient.Main} />
            <AdminRoute path="/administracao/clientes/novo" exact={true} component={View.AdminClient.Main} />
            <AdminRoute path="/administracao/clientes/:clientId" exact={true} component={View.AdminClient.ShowOne} />
            {/*           Admin | Order Routes */}
            <AdminRoute path="/administracao/encomendas" exact={true} component={View.AdminOrder.Main} />
            <AdminRoute path="/administracao/encomendas/nova" exact={true} component={View.AdminOrder.Main} />
            <AdminRoute path="/administracao/encomendas/preparar" exact={true} component={View.AdminOrder.Main} />
            <AdminRoute path="/administracao/encomendas/:orderId" exact={true} component={View.AdminOrder.ShowOne} />
            {/*           Admin | Event Routes */}
            <AdminRoute path="/administracao/eventos" exact={true} component={View.AdminEvent.Main} />
            <AdminRoute path="/administracao/eventos/novo" exact={true} component={View.AdminEvent.NewEvent} />
            <AdminRoute path="/administracao/eventos/:albumId" exact={true} component={View.AdminEvent.ShowOne} />
            {/*           Admin | Photo Size Routes */}
            <AdminRoute path="/administracao/impressoes" exact={true} component={View.AdminPhotosize.Main} />
            <AdminRoute path="/administracao/impressoes/nova" exact={true} component={View.AdminPhotosize.NewSize} />
            <AdminRoute path="/administracao/impressoes/:sizeId" exact={true} component={View.AdminPhotosize.ShowOne} />

            {/* Route Not Found - Redirects to Index */}
            <Redirect to="/"/>
        </Switch>
      </BrowserRouter>
    </View.Base>
  );
}

export { App };
