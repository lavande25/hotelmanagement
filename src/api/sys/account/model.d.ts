export interface ReqAccount {
  Telephone: string;
  Password?: string;
  OldPassword?: string;
}

export interface ResAccount {
  account: string;
  last_login: string;
  mobile: string;
  role_name: string;
  true_name: string;
  user_id: number;
}

export type ResPermission = { auths: Array<string> };
