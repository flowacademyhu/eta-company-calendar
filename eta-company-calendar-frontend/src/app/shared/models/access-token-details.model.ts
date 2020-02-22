export interface AccessTokenDetails {
  user_name: string;
  scope: string[];
  id: number;
  exp: number;
  authorities: string[];
}
