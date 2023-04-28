export interface UserData {
  created_at: string;
  enabled: boolean;
  id: number;
  role: Roles
  updated_at: string;
  user: string;
  verified: boolean;
}

export interface GlobalState {
  login: {
    userData: UserData;
  };
}

export enum Roles {
    ADMIN = "ADMIN",
    SELLER = "SELLER",
    TRANSPORTER = "TRANSPORTER",
    MARKETING = "MARKETING",
    CLIENT = "CLIENT",
}