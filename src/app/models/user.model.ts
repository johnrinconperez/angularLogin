export interface IUser {
  userName: string;
  password: string;
  name: string;
  role: Role;
}

export enum Role {
  user = 1,
  admin = 2
}
