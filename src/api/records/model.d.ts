export interface ReqParams {
  Page: number;
  Size: number;
  Module: string;
}

export interface ResInfoListItem {
  Address: string;
  BankAccount: string;
  BankAddress: string;
  Company: string;
  ID: number;
  InvitedBy: string;
  Name: string;
  SocialCode: string;
  Telephone: string;
}

export interface ResResult {
  Total: number;
  Data: ResInfoListItem[];
}

export interface ReqDeleteParams {
  params: (string | number)[];
}
//[key: string]: number | string | boolean;
