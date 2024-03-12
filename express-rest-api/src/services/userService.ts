import bcrypt from 'bcrypt';
import tokenService from "./tokenService";
import ApiError from "../exceptions/api-error";
import { User } from "../models/users";
import { Errors, UserModel, UserRoles } from "../types/types";
import { createUserDtoWithTokens } from '../utils/helper';

class UserService {
  async registration (name: String, email: String, password: string, role?: UserRoles) {
    const user = await User.findOne({email});

    if (user) {
      throw  ApiError.BadRequest(`user with email: "${email}" already exists`);
    };
  
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({name, email, password: hashedPassword, role});
    const userWithTokens = createUserDtoWithTokens(newUser);

    return userWithTokens;
  };

  async login(email: string, password: string) {
    const user = await User.findOne({email});

    if (!user) {
      throw ApiError.BadRequest(Errors.NoUser);
    }

    const isPasswordMatch =  await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw ApiError.BadRequest(Errors.IncorrectPassword);
    }

   const userWithTokens = createUserDtoWithTokens(user);

   return userWithTokens;
  }

  async logout(refreshToken: string) {
    const deletedToken = await tokenService.removeToken(refreshToken);
    return deletedToken;
  };

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
  
    const tokenData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findTokenInDb(refreshToken);
  
    if (typeof tokenData !== 'object' || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
  
    const user = await User.findById(tokenData._id);
    const userWithTokens = await createUserDtoWithTokens(user);
    console.log(userWithTokens);
  
    return userWithTokens;
  }
};

export default new UserService();