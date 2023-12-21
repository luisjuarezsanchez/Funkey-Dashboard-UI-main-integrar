export interface IUserResponse {
  access_token: string;
  userType: boolean | "specialist" | "patient";
}

export interface IUserPayload {
  email: string;
  password: string;
}

export interface IUserProfile {
  accessToken?: string;
  roles?: string[];
  email?: string;
  name?: string;
  avatar?: string;
  emailVerified?: string;
}
export interface IAuth0Service {
  login: () => void;
  checkSession: () => Promise<unknown>;
  logout: () => void;
}

export interface IAuthResult {
  accessToken: string;
  idTokenPayload: {
    "funkey/roles": string;
    "funkey/email": string;
    "funkey/name": string;
    name: string;
    picture: string;
    email_verified: string;
  };
}
