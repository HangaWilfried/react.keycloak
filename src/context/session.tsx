import { keycloak, IAuth } from '@/utils/auth';
import React, { useContext, useEffect, useRef, useState } from 'react';

const AuthContext = React.createContext<IAuth>({} as IAuth);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const isInitialized = useRef(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  const doesCurrentUserHas = (
    role: string
  ): boolean => {
    return keycloak
      ? keycloak.hasRealmRole(role) || keycloak.hasResourceRole(role)
      : false;
  };  

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      keycloak
        .init({ onLoad: 'check-sso' })
        .then(authenticated => {
          setAuthenticated(authenticated);
          setKeycloakInitialized(true);
        }).catch(() => {
          console.error("Keycloak initialization failed");
          setKeycloakInitialized(true);
        });
    }
  }, []);

  const isUser = () => doesCurrentUserHas("USER");

  const isAdmin = () => doesCurrentUserHas("ADMIN");

  const getUserInfo = () => {
    return {
      id: keycloak.idTokenParsed?.sub as string,
      lastName: keycloak.idTokenParsed?.family_name,
      firstName: keycloak.idTokenParsed?.given_name,
      email: keycloak.idTokenParsed?.email,
    }
  }

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout();
  };

  if (keycloakInitialized) {
    return (
      <AuthContext.Provider value={
        { authenticated, getUserInfo, isAdmin, isUser, login, logout }
      }>
        {children}
      </AuthContext.Provider>
    );
  }

  return <div>Loading...</div>
};

function useAuth() {
  return useContext(AuthContext);
}

export {
  useAuth,
  AuthProvider
}