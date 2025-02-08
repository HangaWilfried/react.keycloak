import Keycloak from "keycloak-js";

export interface IAuth {
    keycloak: Keycloak;
    login: VoidFunction;
    logout: VoidFunction;
    authenticated: boolean;
}

const KEYCLOAK_CONFIG = {
  url: "http://localhost:8080",
  realm: "kd",
  clientId: "kd.web",
};

export const keycloak = new Keycloak(KEYCLOAK_CONFIG);