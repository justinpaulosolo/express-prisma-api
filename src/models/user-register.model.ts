import { LoginUserModel } from "./user-login.model";

export interface UserRegisterModel extends LoginUserModel {
  firstName: string;
  lastName: string;
  email: string;
}
