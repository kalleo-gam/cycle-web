import React, { createContext, useState, useEffect } from 'react';

import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const { authenticated, loading, handleLogin, handleLogout } = useAuth();
  const [activePage, setActivePage] = useState('fornecedores');

  return (
    <Context.Provider value={{ loading, authenticated, handleLogin, handleLogout, activePage, setActivePage }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
