import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import { ProductDetail } from './pages/ProductDetail';
import Products from './pages/Products';
import { RegisterProduct } from './pages/RegisterProduct';
import { Search } from './pages/Search';

const Routes: React.FC = () => {
  function PrivateRoute({ isPrivate, ...rest }: any) {
    const token = localStorage.getItem('igarassu-parafusos:token');
    const userId = localStorage.getItem('igarassu-parafusos:userId');

    if ((isPrivate && !token) || (isPrivate && !userId)) {
      return <Redirect to="/" />;
    }

    return <Route {...rest} />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/products" component={Products} isPrivate />
        <PrivateRoute
          path="/registerProduct"
          component={RegisterProduct}
          isPrivate
        />
        <PrivateRoute path="/search" component={Search} isPrivate />
        <PrivateRoute path="/product" component={ProductDetail} isPrivate />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
