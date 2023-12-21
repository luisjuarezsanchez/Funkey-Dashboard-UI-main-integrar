import * as auth0 from "auth0-js";
import apiClient from "../api";
import { IAuth0Service, IAuthResult } from "./interfaces";

export default class Auth0Service implements IAuth0Service {
  private defaultConnection = "dev-codice-azul-ad";

  private webAuth = new auth0.WebAuth({
    domain: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL || "",
    clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || "",
    redirectUri: process.env.NEXT_PUBLIC_AUTH0_BASE_URL,
    responseType: "token id_token",
    scope: "openid profile email",
    audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    _disableDeprecationWarnings: true,
  });

  public login() {
    this.webAuth.authorize({ connection: this.defaultConnection });
  }

  public checkSession() {
    return new Promise((resolve, reject) => {
      this.webAuth.checkSession(
        {
          usePostMessage: true,
        },
        async function (error, result: IAuthResult) {
          if (error) {
            console.log(`Error checkSession: ${JSON.stringify(error)}`);

            return reject(error);
          }
          if (result) {
            apiClient.setAccessToken(result.accessToken);
            resolve({
              accessToken: result.accessToken,
              roles: result.idTokenPayload["funkey/roles"],
              email: result.idTokenPayload["funkey/email"],
              name: result.idTokenPayload.name,
              avatar: result.idTokenPayload.picture,
              emailVerified: result.idTokenPayload.email_verified,
            });
          }
        }
      );
    });
  }

  public logout() {
    this.webAuth.logout({
      returnTo: process.env.NEXT_PUBLIC_AUTH0_LOGOUT_URL,
      clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
      federated: true,
    });
  }
}
