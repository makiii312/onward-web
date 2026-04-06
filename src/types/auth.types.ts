export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserSessionData {
  token: string;
  userId: string;
  firstName: string;
  lastName: string;
}
