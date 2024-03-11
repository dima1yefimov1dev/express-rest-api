import { User } from "../models/users";
import bcrypt from 'bcrypt';


export const registration = async (name, email, password) => {
  const user = await User.findOne({email});

  if (user) {
    throw new Error('User with this email already exists');
  };

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = await User.create({name, email, password: hashedPassword});
  await newUser.save();

  return newUser;
};