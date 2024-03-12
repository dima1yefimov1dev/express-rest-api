import { ObjectId } from "mongodb";

export enum UserRoles {
  USER = 'user',
  ADMIN = 'administrator',
};

export interface UserModel {
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  role: UserRoles,
};

export enum Errors {
  Unauthorized = 'User is not authorized',
  Server = 'Some error occurred on server',
  Validation = 'Validation failed',
  NoUser = 'User with this email wasn`t found',
  IncorrectPassword = 'You have entered wrong password',
};