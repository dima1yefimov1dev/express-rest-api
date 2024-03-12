import { Schema, model } from "mongoose";
import { UserRoles } from "../types/types";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: UserRoles.USER,
    enum: [UserRoles.ADMIN, UserRoles.USER],
  }
});

export const User = model('User', UserSchema);