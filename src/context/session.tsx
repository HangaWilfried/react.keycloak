import { keycloak, IAuth } from '@/utils/auth';
import React, { useContext, useEffect, useRef, useState } from 'react';

export const AuthContext = React.createContext<IAuth>({} as IAuth);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  const isInitialized = useRef(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

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

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout();
  };

  if(keycloakInitialized) {
    return (
      <AuthContext.Provider value={{ authenticated, keycloak, login, logout }}>
       {children}
      </AuthContext.Provider>
    );
  }

  return <div>Loading...</div>
};

export function useAuth() {
    return useContext(AuthContext);
}