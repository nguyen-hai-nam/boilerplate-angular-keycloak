import {Injectable} from '@angular/core';
import Keycloak from "keycloak-js";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak!: Keycloak;

  get keycloak(): Keycloak {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8080',
        realm: 'master',
        clientId: 'boilerplate-angular-keycloak',
      });
    }
    return this._keycloak;
  }

  constructor() { }

  async init() {
    console.info("Initializing Keycloak...");
    const authenticated = await this.keycloak.init({
      onLoad: 'login-required'
    });
    if (!authenticated) {
      console.error("Failed to authenticate with Keycloak.");
      return;
    } else {
      console.info("Token: ", this.keycloak.token);
    }
  }
}
