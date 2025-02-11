import Keycloak from "keycloak-js";

type UserInfo = {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
}

export interface IAuth {
  login: VoidFunction;
  logout: VoidFunction;
  isUser: () => boolean;
  isAdmin: () => boolean;
  authenticated: boolean;
  getUserInfo: () => UserInfo;
}

const KEYCLOAK_CONFIG = {
  url: "http://localhost:8080",
  realm: "demo",
  clientId: "kd.web",
};

export const keycloak = new Keycloak(KEYCLOAK_CONFIG);