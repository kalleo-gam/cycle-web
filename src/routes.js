import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from './Context/AuthContext';

import Login from './pages/Login';
import Users from './pages/Users';
import Fornecedores from './pages/Fornecedores';
import Pecas from './pages/Pecas';

function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute isPrivate exact path="/fornecedores" component={Fornecedores} />
      <CustomRoute isPrivate exact path="/pecas" component={Pecas} />
      <CustomRoute isPrivate exact path="/users" component={Users} />
    </Switch>
  );
}