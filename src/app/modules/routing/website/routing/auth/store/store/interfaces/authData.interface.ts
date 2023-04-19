export interface AuthData {
  /**
   * access
   */
  token: string | null;
  /**
   * user id
   */
  id?: number;
  /**
   * token create timestamp
   */
  iat?: number;
  /**
   * token expiration timestamp
   */
  exp?: number | null;
}
